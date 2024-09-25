// Copyright 2024, University of Colorado Boulder

// @author Jonathan Olson <jonathan.olson@colorado.edu>
// @author Taliesn Smith <taliesin.smith@colorado.edu>

/* eslint-disable */

export default () => {
  let context;
  let strings;

  /*********************************************
   * Constants
   *********************************************/

  const solutes = [
    phet.phScale.Solute.BATTERY_ACID,
    phet.phScale.Solute.BLOOD,
    phet.phScale.Solute.CHICKEN_SOUP,
    phet.phScale.Solute.COFFEE,
    phet.phScale.Solute.DRAIN_CLEANER,
    phet.phScale.Solute.HAND_SOAP,
    phet.phScale.Solute.MILK,
    phet.phScale.Solute.ORANGE_JUICE,
    phet.phScale.Solute.SODA,
    phet.phScale.Solute.SPIT,
    phet.phScale.Solute.VOMIT,
    phet.phScale.Solute.WATER
  ];

  /*********************************************
   * Enumeration Mappings (value => enumeration value)
   *********************************************/

  // Qualitative Total Volume Ranges
  const totalVolumeToEnum = totalVolume => {
    if ( totalVolume === 0 ) {
      return 'empty';
    }
    else if ( totalVolume < 0.3 ) {
      return 'nearlyEmpty';
    }
    else if ( totalVolume < 0.595 ) {
      return 'underHalfFull';
    }
    else if ( totalVolume < 0.605 ) {
      return 'halfFull';
    }
    else if ( totalVolume < 0.9 ) {
      return 'overHalfFull';
    }
    else if ( totalVolume < 1.195 ) {
      return 'nearlyFull';
    }
    else {
      return 'full';
    }
  };
  // pH Qualitative Ranges
    const phValueToEnum = phValue => {
   if(phValue === null) {
     return 'none';
   }
    else if ( phValue <= 1 ) {
      return 'extremelyAcidic';
    }
    else if ( phValue <= 3 ) {
      return 'highlyAcidic';
    }
    else if ( phValue <= 5 ) {
      return 'moderatelyAcidic';
    } 
    else if ( phValue < 7 ) {
      return 'slightlyAcidic';
    }
    else if ( phValue === 7 ) {
      return 'neutral';
    }
    else if ( phValue < 9 ) {
      return 'slightlyBasic';
    }
    else if ( phValue < 11 ) {
      return 'moderatelyBasic';
    }
    else if ( phValue < 13 ) {
      return 'highlyBasic';
    }
    else {
      return 'extremelyBasic';
    }
  };

  // Added Water Volume
  const addedWaterVolumeToEnum = (addedWaterVolume, solutionTotalVolume) => {
    const percentAddedWater = ( addedWaterVolume/solutionTotalVolume );
    if ( percentAddedWater === 0 ) {
      return 'no';
    }
    else if ( percentAddedWater <= 0.1 ) {
      return 'aTinyBitOf';
    }
    else if ( percentAddedWater <=  0.25 ) {
      return 'aLittle';
    }
    else if ( percentAddedWater < 0.495 ) {
      return 'some';
    }
    else if ( percentAddedWater < 0.505  ) {
      return 'equalAmountsOf';
    }
    else if ( percentAddedWater < 0.75 ) {
      return 'aFairAmountOf';
    }
    else if ( percentAddedWater < 0.90  ) {
      return 'lotsOf';
    }
    else {
      return 'mostly';
    }
  };

  // Solute / Solution Colors without added water 
  const soluteToColorEnum = ( solute ) => {
    if ( solute === 'BATTERY_ACID' || solute === 'DRAIN_CLEANER' ) {
      return 'brightYellow';
    }
    else if ( solute === 'BLOOD' ) {
      return 'red';
    }
    else if ( solute === 'CHICKEN_SOUP') {
      return 'darkYellow';
    }
    else if ( solute === 'COFFEE') {
      return 'brown';
    }
    else if ( solute === 'HAND_SOAP') {
      return 'lavender';
    }
    else if ( solute === 'MILK') {
      return 'white';
    }
    else if ( solute === 'ORANGE_JUICE') {
      return 'orange';
    }
    else if ( solute === 'SODA') {
      return 'limeGreen';
    }
    else if ( solute === 'VOMIT') {
      return 'salmon';
    }
    else {
      return 'colorless';
    }
  };

  const flowRateToEnum = flowRate => {
    if ( flowRate === 0 ) {
      return 'off';
    }
    else if ( flowRate < 0.15 ) {
      return 'slow';
    }
    else {
      return 'fast';
    }
  };

  return phet.joist.DescriptionContext.registerLogic( {
    launch( descriptionContext, descriptionStrings ) {
      context = descriptionContext;
      strings = descriptionStrings;

      const macroScreen = context.get( 'phScaleBasics.macroScreen' );
      if ( macroScreen ) {
        const macroScreenView = context.get( 'phScaleBasics.macroScreen.view' );

        /*********************************************
         * Screen Summary State Descriptions
         *********************************************/

        // Node that we will update with dynamic content
        const dynamicScreenSummaryNode = context.createNode( {
          tagName: 'p'
        } );

        // Screen summary content
        context.nodeSet( macroScreenView, 'screenSummaryContent', context.createNode( {
          children: [
            new phet.scenery.Node( {
              tagName: 'p',
              innerContent: strings.screenSummaryP1()
            } ),
            new phet.scenery.Node( {
              tagName: 'p',
              innerContent: strings.screenSummaryP2()
            } ),
            dynamicScreenSummaryNode,
            new phet.scenery.Node( {
              tagName: 'p',
              innerContent: strings.screenSummaryP3()
            } )
          ]
        } ) );

        // Dynamic content
        const addedWaterVolumeProperty = context.get( 'phScaleBasics.macroScreen.model.solution.waterVolumeProperty' );
        const solutionTotalVolumeProperty = context.get( 'phScaleBasics.macroScreen.model.solution.totalVolumeProperty' );
        const soluteProperty = context.get( 'phScaleBasics.macroScreen.model.dropper.soluteProperty' );
        const solutionPHProperty = context.get( 'phScaleBasics.macroScreen.model.solution.pHProperty' );
        const meterPHProperty = context.get( 'phScaleBasics.macroScreen.model.pHMeter.pHProperty' );
        context.multilink( [
          // TODO: context.get doesn't work for "This element is defined in" cases, e.g. model.solution.soluteProperty won't work
          // TODO: add all properties that can change and need to be watched.
          soluteProperty,
          solutionTotalVolumeProperty,
          addedWaterVolumeProperty,
          solutionPHProperty,
          meterPHProperty,

        ], (
          solute,
          solutionTotalVolume,
          addedWaterVolume,
          solutionPH,
          meterPH
        ) => {
          
          // console.log( `STV:` + solutionTotalVolume, `STVP:` + solutionTotalVolumeProperty)
          dynamicScreenSummaryNode.innerContent = strings.dynamicScreenSummary(
            solute.tandemName,
            totalVolumeToEnum( solutionTotalVolume ),
            solutionPH,
            meterPH,
            phValueToEnum( solutionPH ), 
            solutionTotalVolume, 
            soluteToColorEnum( solute.tandemName ),
            addedWaterVolumeToEnum( addedWaterVolume, solutionTotalVolume )
          );
        } );

        /*********************************************
         * Play Area State Descriptions
         *********************************************/

        // Beaker
        const beakerNode = context.get( 'phScaleBasics.macroScreen.view.beakerNode' );
        {
          context.nodeSet( beakerNode, 'tagName', 'div' );
          context.nodeSet( beakerNode, 'labelTagName', 'h3' );
          context.nodeSet( beakerNode, 'labelContent', strings.beakerHeading() );
        }

         //pH Meter Heading
        const phMeterHeading = context.createNode( {
          tagName: 'h3',
          innerContent: strings.phMeterHeading()
        } );
        macroScreenView.addChild( phMeterHeading );

        // pH Meter Probe
        const phMeterProbeNode = context.get( 'phScaleBasics.macroScreen.view.pHMeterNode.probeNode' );
        context.nodeSet( phMeterProbeNode, 'helpText', strings.phMeterProbeHelpText() );
        {
          context.nodeSet( phMeterProbeNode, 'accessibleName', strings.phMeterProbeAccessibleName() );
        }

        // Controls Heading
        const controlsHeading = context.createNode( {
          tagName: 'h3',
          innerContent: strings.controlsHeading()
        } );
        macroScreenView.addChild( controlsHeading );

        // Solute ComboBox
        const soluteComboBox = context.get( 'phScaleBasics.macroScreen.view.soluteComboBox' );
        context.nodeSet( soluteComboBox, 'helpText', strings.soluteComboBoxHelpText() );
        context.nodeSet( soluteComboBox, 'accessibleName', strings.soluteComboBoxAccessibleName() );
        for ( const solute of solutes ) {
          context.propertySet( soluteComboBox.a11yNamePropertyMap.get( solute ), strings.soluteName( solute.tandemName ) );
        }

        // Dropper
        const dropperNodeButton = context.get( 'phScaleBasics.macroScreen.view.dropperNode.button' );
        {
          context.nodeSet( dropperNodeButton, 'accessibleName', strings.dropperAccessibleName() );
        }

        // Water Faucet
        const waterFaucetNode = context.get( 'phScaleBasics.macroScreen.view.waterFaucetNode.faucetNode' );
        {
          context.nodeSet( waterFaucetNode, 'accessibleName', strings.waterFaucetAccessibleName() );
          context.nodeSet( waterFaucetNode, 'helpText', strings.waterFaucetHelpText() );
          context.nodeSet( waterFaucetNode, 'pdomCreateAriaValueText', value => {
            return strings.faucetAriaValueText( flowRateToEnum( value ) );
          } );

          context.nodeSet( waterFaucetNode, 'keyboardStep', 0.1 );
        }

        // Drain Faucet
        const drainFaucetNode = context.get( 'phScaleBasics.macroScreen.view.drainFaucetNode' );
        {
          context.nodeSet( drainFaucetNode, 'accessibleName', strings.drainFaucetAccessibleName() );
          context.nodeSet( drainFaucetNode, 'helpText', strings.drainFaucetHelpText() );
          context.nodeSet( drainFaucetNode, 'pdomCreateAriaValueText', value => {
            return strings.faucetAriaValueText( flowRateToEnum( value ) );
          } );
        }

        /*********************************************
         * Control Area State Descriptions
         *********************************************/

        const resetAllButtonNode = context.get( 'phScaleBasics.macroScreen.view.resetAllButton' );

        /*********************************************
         * PDOM Order
         *********************************************/

        // Play Area
        context.nodeSet( macroScreenView.pdomPlayAreaNode, 'pdomOrder', [
          beakerNode,
          phMeterHeading,
          controlsHeading,
          soluteComboBox,
          dropperNodeButton,
          phMeterProbeNode,
          waterFaucetNode,
          drainFaucetNode
        ] );

        // Control Area
        context.nodeSet( macroScreenView.pdomControlAreaNode, 'pdomOrder', [
          resetAllButtonNode
        ] );

        /*********************************************
         * Object Responses
         *********************************************/

        // Demo example for simple object response
        context.lazyLink( context.get( 'phScaleBasics.macroScreen.model.dropper.isDispensingProperty' ), isDispensing => {
          dropperNodeButton.alertDescriptionUtterance( strings.dropperDispensingAlert( isDispensing ) );
        } );

        // Describe probe movement
        {
          const utterance = context.createUtterance( {
            alert: strings.phMeterProbeMovedAlert(),
            announcerOptions: {
              ariaLivePriority: phet.utteranceQueue.AriaLive.ASSERTIVE
            }
          } );

          context.multilink( [
            context.get( 'phScaleBasics.macroScreen.model.pHMeter.probe.positionProperty' )
          ], (
            probePosition
          ) => {
            phMeterProbeNode.alertDescriptionUtterance( utterance );
          } );
        }

        /*********************************************
         * Context Responses
         *********************************************/

        // Water faucet
        context.nodeSet( waterFaucetNode, 'pdomCreateContextResponseAlert', value => {
          return strings.faucetContextResponse( value > 0 );
        } );

        // Liquid level changing alerts (demo for complicated context response)
        {
          const solutionTotalVolumeProperty = context.get( 'phScaleBasics.macroScreen.model.solution.totalVolumeProperty' );
          const waterFaucetFlowRateProperty = context.get( 'phScaleBasics.macroScreen.model.waterFaucet.flowRateProperty' );
          const drainFaucetFlowRateProperty = context.get( 'phScaleBasics.macroScreen.model.drainFaucet.flowRateProperty' );

          const isLiquidLevelChangingProperty = context.createDerivedProperty( [
            context.get( 'phScaleBasics.macroScreen.model.dropper.isDispensingProperty' ),
            waterFaucetFlowRateProperty,
            drainFaucetFlowRateProperty
          ], ( isDispensing, waterFaucetFlowRate, drainFaucetFlowRate ) => {
            return isDispensing || waterFaucetFlowRate > 0 || drainFaucetFlowRate > 0;
          } );

          let callbackTimer = context.createCallbackTimer( {
            callback: () => {
              beakerNode.alertDescriptionUtterance( strings.liquidChangingAlert(
                waterFaucetFlowRateProperty.value > drainFaucetFlowRateProperty.value,
                Math.round( solutionTotalVolumeProperty.value * 10 ) / 10
              ) );
            },
            delay: 1000,
            interval: 1000
          } );
          isLiquidLevelChangingProperty.lazyLink( isLiquidLevelChanging => {
            callbackTimer.stop();

            if ( isLiquidLevelChanging ) {
              callbackTimer.start();
            }
            else {
              beakerNode.alertDescriptionUtterance( strings.liquidChangingDoneAlert(
                totalVolumeToEnum( solutionTotalVolumeProperty.value )
              ) );
            }
          } );
        }
      }
    },
    added( tandemID, obj ) {
      // Will be called when an object is dynamically added after sim start-up
    },
    removed( tandemID, obj ) {
      // Will be called when an object is dynamically removed after sim start-up
    },
    dispose() {

    }
  } );
};
