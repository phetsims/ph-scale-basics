// Copyright 2024, University of Colorado Boulder

// @author Jonathan Olson <jonathan.olson@colorado.edu>
// @author Taliesn Smith <taliesin.smith@colorado.edu>

/* eslint-disable */

export default () => {
  let context;
  let strings;

  const totalVolumeToEnum = totalVolume => {
    if ( totalVolume === 0 ) {
      return 'empty';
    }
    else if ( totalVolume < 1.2 ) {
      return 'partiallyFilled';
    }
    else {
      return 'full';
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

        // Beaker heading
        const beakerNode = context.get( 'phScaleBasics.macroScreen.view.beakerNode' );
        
        // pH Meter heading
        const pHMeterNode = context.get( 'phScaleBasics.macroScreen.view.pHMeterNode' );
        
        
        // solution
        //const soluteProperty = context.get( 'phScaleBasics.macroScreen.model.solution.soluteProperty' );
        const soluteProperty = context.get( 'phScaleBasics.macroScreen.model.dropper.soluteProperty' ); // TODO: why was this not defined?
        const solutionPHProperty = context.get( 'phScaleBasics.macroScreen.model.solution.pHProperty' );
        const solutionTotalVolumeProperty = context.get( 'phScaleBasics.macroScreen.model.solution.totalVolumeProperty' );
        const soluteVolumeProperty = context.get( 'phScaleBasics.macroScreen.model.solution.soluteVolumeProperty' );
        const waterVolumeProperty = context.get( 'phScaleBasics.macroScreen.model.solution.waterVolumeProperty' );

        // pH Meter
        const pHMeterPHProperty = context.get( 'phScaleBasics.macroScreen.model.pHMeter.pHProperty' );
        const pHMeterPositionProperty = context.get( 'phScaleBasics.macroScreen.model.pHMeter.probe.positionProperty' );
        const phMeterProbeNode = context.get( 'phScaleBasics.macroScreen.view.pHMeterNode.probeNode' );

        // Dropper
        const dropperNodeButton = context.get( 'phScaleBasics.macroScreen.view.dropperNode.button');
        const dropperEnabledProperty = context.get( 'phScaleBasics.macroScreen.model.dropper.enabledProperty' );
        const isDispensingProperty = context.get( 'phScaleBasics.macroScreen.model.dropper.isDispensingProperty' );
        const isAutofillingProperty = context.get( 'phScaleBasics.macroScreen.model.isAutofillingProperty' );

        // Water faucet
        const waterFaucetNode = context.get( 'phScaleBasics.macroScreen.view.waterFaucetNode.faucetNode' );
        const waterFaucetEnabledProperty = context.get( 'phScaleBasics.macroScreen.model.waterFaucet.enabledProperty' );
        const waterFaucetFlowRateProperty = context.get( 'phScaleBasics.macroScreen.model.waterFaucet.flowRateProperty' );

        // Drain faucet
        const drainFaucetNode = context.get( 'phScaleBasics.macroScreen.view.drainFaucetNode' );
        const drainFaucetEnabledProperty = context.get( 'phScaleBasics.macroScreen.model.drainFaucet.enabledProperty' );
        const drainFaucetFlowRateProperty = context.get( 'phScaleBasics.macroScreen.model.drainFaucet.flowRateProperty' );

       { //Beaker section
          context.nodeSet( beakerNode, 'tagName', "div");
          context.nodeSet( beakerNode, 'labelTagName', "h3");
          context.nodeSet( beakerNode, 'labelContent', strings.beakerHeading());
        }
        
        { //pH Meter section
          context.nodeSet( pHMeterNode, 'tagName', "div");
          context.nodeSet( pHMeterNode, 'labelTagName', "h3");
          context.nodeSet( pHMeterNode, 'labelContent', strings.pHMeterHeading());
        }
        
       // { //Controls section
          const controlsHeading = context.createNode( {
            tagName: 'h3',
            innerContent: strings.controlsHeading()
          } );
        macroScreenView.addChild(controlsHeading);
       // }
        
        { // liquid level changing alerts

          const isLiquidLevelChangingProperty = context.createDerivedProperty( [
            isDispensingProperty,
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
        
        { //dropper
          context.nodeSet( dropperNodeButton, 'accessibleName', strings.dropperAccessibleName() );
        }
        
        { //pH Meter Probe
          context.nodeSet( phMeterProbeNode, 'accessibleName', strings.phMeterProbeAccessibleName() );
        }

        { // water faucet
          context.nodeSet( waterFaucetNode, 'accessibleName', strings.waterFaucetAccessibleName() );
          context.nodeSet( waterFaucetNode, 'helpText', strings.waterFaucetHelpText() );
          context.nodeSet( waterFaucetNode, 'pdomCreateAriaValueText', value => {
            return strings.faucetAriaValueText( flowRateToEnum( value ) );
          } );

          context.nodeSet( waterFaucetNode, 'keyboardStep', 0.1 );

          context.nodeSet( waterFaucetNode, 'pdomCreateContextResponseAlert', value => {
            return strings.faucetContextResponse( value > 0 );
          } );
        }

        { // drain faucet
          context.nodeSet( drainFaucetNode, 'accessibleName', strings.drainFaucetAccessibleName() );
          context.nodeSet( drainFaucetNode, 'helpText', strings.drainFaucetHelpText() );
          context.nodeSet( drainFaucetNode, 'pdomCreateAriaValueText', value => {
            return strings.faucetAriaValueText( flowRateToEnum( value ) );
          } );
        }

        { // describe probe movement
          const utterance = context.createUtterance( {
            alert: 'The probe moved!',
            announcerOptions: {
              ariaLivePriority: phet.utteranceQueue.AriaLive.ASSERTIVE
            }
          } );

          context.multilink( [
            pHMeterPositionProperty
          ], (
            probePosition
          ) => {
            phMeterProbeNode.alertDescriptionUtterance( utterance );
          } );
        }

        const dynamicScreenSummaryNode = context.createNode( {
          tagName: 'p'
        } );

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

        context.multilink( [
          soluteProperty,
          solutionTotalVolumeProperty
        ], (
          solute,
          solutionTotalVolume
        ) => {
          // 
          dynamicScreenSummaryNode.innerContent = strings.dynamicScreenSummary(
            solute.tandemName,
            totalVolumeToEnum( solutionTotalVolume ),
            solutionPHProperty.value,
            solutionTotalVolumeProperty.value, //needs rounding
            
          );
        } );

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

        const soluteComboBox = context.get( 'phScaleBasics.macroScreen.view.soluteComboBox' );
        context.nodeSet( soluteComboBox, 'accessibleName', strings.soluteComboBoxAccessibleName() );
        for ( const solute of solutes ) {
          context.propertySet( soluteComboBox.a11yNamePropertyMap.get( solute ), strings.soluteName( solute.tandemName ) );
        }

        // pdomOrder - Can use vaiables here to shorten code
        context.nodeSet( macroScreenView.pdomPlayAreaNode, 'pdomOrder', [
          beakerNode,
          context.get( 'phScaleBasics.macroScreen.view.pHMeterNode' ),
          controlsHeading,
          context.get( 'phScaleBasics.macroScreen.view.soluteComboBox' ),
          context.get( 'phScaleBasics.macroScreen.view.soluteListParent' ),
          context.get( 'phScaleBasics.macroScreen.view.dropperNode.button' ),
          context.get( 'phScaleBasics.macroScreen.view.waterFaucetNode' ),
          context.get( 'phScaleBasics.macroScreen.view.drainFaucetNode' ),
          context.get( 'phScaleBasics.macroScreen.view.resetAllButton' )
        ] );

        context.lazyLink( isDispensingProperty, isDispensing => {
          dropperNodeButton.alertDescriptionUtterance( strings.dropperDispensingAlert( isDispensing ) );
        } );
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
