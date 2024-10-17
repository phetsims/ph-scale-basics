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
    if ( phValue === null ) {
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
  const addedWaterVolumeToEnum = ( addedWaterVolume, solutionTotalVolume ) => {

    // Round values so that the description for 'equal' aligns with the displayed values in the sim
    const roundedWaterVolume = phet.dot.Utils.toFixedNumber( addedWaterVolume, 3 );
    const roundedTotalVolume = phet.dot.Utils.toFixedNumber( solutionTotalVolume, 3 );

    let percentAddedWater = 0;
    if ( roundedTotalVolume > 0 ) {
      percentAddedWater = roundedWaterVolume / roundedTotalVolume;
    }

    const amountsEqual = phet.dot.Utils.equalsEpsilon( roundedWaterVolume, roundedTotalVolume - roundedWaterVolume, 0.02 );

    if ( percentAddedWater === 0 ) {
      return 'no';
    }
    else if ( amountsEqual ) {

      // Amounts of added water are equal.
      return 'equalAmountsOf';
    }
    else if ( percentAddedWater <= 0.1 ) {
      return 'aTinyBitOf';
    }
    else if ( percentAddedWater <= 0.25 ) {
      return 'aLittle';
    }
    else if ( percentAddedWater < 0.49 ) {
      return 'some';
    }
    else if ( percentAddedWater < 0.75 ) {
      return 'aFairAmountOf';
    }
    else if ( percentAddedWater < 0.90 ) {
      return 'lotsOf';
    }
    else {
      return 'mostly';
    }
  };

  // Solute / Solution Colors without added water 
  const soluteToColorEnum = ( solute ) => {
    if ( solute === 'batteryAcid' || solute === 'drainCleaner' ) {
      return 'brightYellow';
    }
    else if ( solute === 'blood' ) {
      return 'red';
    }
    else if ( solute === 'chickenSoup' ) {
      return 'darkYellow';
    }
    else if ( solute === 'coffee' ) {
      return 'brown';
    }
    else if ( solute === 'handSoap' ) {
      return 'lavender';
    }
    else if ( solute === 'milk' ) {
      return 'white';
    }
    else if ( solute === 'orangeJuice' ) {
      return 'orange';
    }
    else if ( solute === 'soda' ) {
      return 'limeGreen';
    }
    else if ( solute === 'vomit' ) {
      return 'salmon';
    }
    else {
      return 'colorless';
    }
  };

  // Maps the flow rate to a value that can be used to describe how open the faucet is.
  // The returned "enumeration" value can be used to create a description string.
  const flowRateToFaucetOpenEnum = flowRate => {
    if ( flowRate === 0 ) {
      return 'closed';
    }
    else if ( flowRate <= 0.10 * 0.25 ) {
      return 'openATinyBit';
    }
    else if ( flowRate <= 0.30 * 0.25 ) {
      return 'openALittle';
    }
    else if ( flowRate < 0.48 * 0.25 ) {
      return 'somewhatOpen';
    }
    else if ( flowRate < 0.52 * 0.25 ) {
      return 'halfwayOpen';
    }
    else if ( flowRate < 1.00 * 0.25 ) {
      return 'openALot'
    }
    else {
      return 'fullyOpen';
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

        const solutionTotalVolumeProperty = context.get( 'phScaleBasics.macroScreen.model.solution.totalVolumeProperty' );

        // Total volume formatted to 2 decimal places.
        const formattedTotalVolumeProperty = context.createDerivedProperty( [ solutionTotalVolumeProperty ], totalVolume => {
          return phet.dot.Utils.toFixedNumber( totalVolume, 2 );
        } )

        const solutionPHProperty = context.get( 'phScaleBasics.macroScreen.model.solution.pHProperty' );
        const meterPHProperty = context.get( 'phScaleBasics.macroScreen.model.pHMeter.pHProperty' );

        // Formatted values, which should generally be used when displaying values to the user.
        const formattedSolutionPHProperty = context.createDerivedProperty( [ solutionPHProperty ], solutionPH => {
          return solutionPH === null ? null : phet.dot.Utils.toFixedNumber( solutionPH, 2 );
        } );
        const formattedMeterPHProperty = context.createDerivedProperty( [ meterPHProperty ], meterPH => {
          return meterPH === null ? null : phet.dot.Utils.toFixedNumber( meterPH, 2 );
        } );

        // Dynamic content
        const addedWaterVolumeProperty = context.get( 'phScaleBasics.macroScreen.model.solution.waterVolumeProperty' );
        const soluteProperty = context.get( 'phScaleBasics.macroScreen.model.dropper.soluteProperty' );
        context.multilink( [
          soluteProperty,
          formattedTotalVolumeProperty,
          addedWaterVolumeProperty,
          formattedSolutionPHProperty,
          formattedMeterPHProperty
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

          // Solution in Beaker
        const beakerNode = context.get( 'phScaleBasics.macroScreen.view.beakerNode' );

        // A parent for additional descriptions for the solution in the beaker
        const solutionDescriptionParentNode = context.createNode( { tagName: 'div' } );
        macroScreenView.addChild( solutionDescriptionParentNode );
        {
          context.nodeSet( beakerNode, 'tagName', 'div' );
          context.nodeSet( beakerNode, 'labelTagName', 'h3' );
          context.nodeSet( beakerNode, 'labelContent', strings.beakerHeading() );

          const beakerParagraphNode = context.createNode( { tagName: 'p' } );
          const beakerNodeUnorderedList = context.createNode( { tagName: 'ul' } );

          solutionDescriptionParentNode.children = [ beakerParagraphNode, beakerNodeUnorderedList ];

          context.multilink( [ soluteProperty, formattedTotalVolumeProperty ], ( solute, totalVolume ) => {
            beakerParagraphNode.visible = totalVolume !== 0;
            beakerParagraphNode.innerContent = strings.solutionParagraph( solute.tandemName );
          } );

          const addedWaterVolumeListItemNode = context.createNode( {
            tagName: 'li'
          } );
          const totalSolutionVolumeListItemNode = context.createNode( { tagName: 'li' } );

          context.multilink( [ soluteProperty, addedWaterVolumeProperty, formattedTotalVolumeProperty ], ( solute, addedWaterVolume, solutionTotalVolume ) => {
            const addedWaterVolumeEnum = addedWaterVolumeToEnum( addedWaterVolume, solutionTotalVolume );
            const soluteColorEnum = soluteToColorEnum( solute.tandemName );
            const totalVolumeEnum = totalVolumeToEnum( solutionTotalVolume );

            addedWaterVolumeListItemNode.visible = totalVolumeEnum !== 'empty';


            if ( solute === phet.phScale.Solute.WATER ) {
              addedWaterVolumeListItemNode.innerContent = strings.isNeutral();
            }
            else if ( soluteColorEnum === 'colorless' || addedWaterVolumeEnum === 'no' ) {
              addedWaterVolumeListItemNode.innerContent = strings.addedVolumeDescription( soluteColorEnum, addedWaterVolumeEnum );
            }
            else {

              // A slightly modified description to indicate that the color is 'lighter' when water is added.
              addedWaterVolumeListItemNode.innerContent = strings.addedVolumeDescriptionWithWater( soluteColorEnum, addedWaterVolumeEnum );
            }
          } );

          context.multilink( [ formattedTotalVolumeProperty ], solutionTotalVolume => {
            totalSolutionVolumeListItemNode.innerContent = strings.totalSolutionVolumeDescription( totalVolumeToEnum( solutionTotalVolume ), solutionTotalVolume );
          } );

          beakerNodeUnorderedList.children = [
            addedWaterVolumeListItemNode,
            totalSolutionVolumeListItemNode
          ]
        }

        //pH Meter Heading
        const phMeterHeading = context.createNode( {
          tagName: 'h3',
          innerContent: strings.phMeterHeading()
        } );
        macroScreenView.addChild( phMeterHeading );

        // a parent container for the pH meter description
        const phMeterDescriptionParentNode = context.createNode( { tagName: 'div' } );
        macroScreenView.addChild( phMeterDescriptionParentNode );

        // a description of the meter location, and then a list of decriptions for other meter state
        const phMeterLocationParagraphNode = context.createNode( { tagName: 'p' } );
        const phMeterDescriptionListNode = context.createNode( { tagName: 'ul' } );

        // add the nodes to the parent
        phMeterDescriptionParentNode.children = [ phMeterLocationParagraphNode, phMeterDescriptionListNode ];

        // individual list items
        const phValueItemNode = context.createNode( { tagName: 'li' } );
        const qualitativePHItemNode = context.createNode( { tagName: 'li' } );
        const meterDescriptionItemNode = context.createNode( { tagName: 'li' } );

        // add the list items to the list
        phMeterDescriptionListNode.children = [
          phValueItemNode,
          qualitativePHItemNode,
          meterDescriptionItemNode
        ];

        phMeterLocationParagraphNode.innerContent = `(placeholder for probe location)`;

        context.link( formattedMeterPHProperty, meterPH => {
          phValueItemNode.visible = meterPH !== null;
          qualitativePHItemNode.visible = meterPH !== null;

          phValueItemNode.innerContent = strings.measuredPHDescription( meterPH );
          qualitativePHItemNode.innerContent = strings.qualitativePHDescription( phValueToEnum( meterPH ) );
        } );

        meterDescriptionItemNode.innerContent = '(placeholder for meter description)';

        // pH Meter Probe
        const phMeterProbeNode = context.get( 'phScaleBasics.macroScreen.view.pHMeterNode.probeNode' );

        // ph Meter Probe GrabDragInteraction - this will only be available when testing with a query parameter
        const phMeterProbeGrabDragInteraction = context.get( 'phScaleBasics.macroScreen.view.pHMeterNode.probeNode.grabDragInteraction' );
        if ( phMeterProbeGrabDragInteraction ) {
          context.nodeSet( phMeterProbeGrabDragInteraction, 'idleStateAccessibleName', strings.phMeterProbeGrabAccessibleName() );
          context.nodeSet( phMeterProbeGrabDragInteraction, 'grabbedStateAccessibleName', strings.phMeterProbeAccessibleName() );
          context.nodeSet( phMeterProbeGrabDragInteraction, 'keyboardHelpText', strings.phMeterProbeHelpText() );

          context.nodeSet( phMeterProbeGrabDragInteraction, 'onGrab', () => {
            console.log( 'Grabbed!' );
          } );

          context.nodeSet( phMeterProbeGrabDragInteraction, 'onRelease', () => {
            console.log( 'Released!' );
          } );
        }
        else {

          // Not using GrabDragInteraction, so we can set content on the meter probe node directly.
          context.nodeSet( phMeterProbeNode, 'helpText', strings.phMeterProbeHelpText() );
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

            // reverseAlternativeInput is used, which makes the provided value 'inverted' - we need to re-invert it
            // to describe it correctly.
            // TODO: This is confusing, make better? The callback should provide an appropriate value to use.
            const actualValue = 0.25 - value;
            return strings.faucetAriaValueText( flowRateToFaucetOpenEnum( actualValue ) );
          } );

          /// 10 steps to fully open; 20 small steps; 2 big steps
          context.nodeSet( waterFaucetNode, 'keyboardStep', 0.25 / 10 );
          context.nodeSet( waterFaucetNode, 'shiftKeyboardStep', 0.25 / 20 );
          context.nodeSet( waterFaucetNode, 'pageKeyboardStep', 0.25 / 2 );
        }

        // Drain Faucet
        const drainFaucetNode = context.get( 'phScaleBasics.macroScreen.view.drainFaucetNode' );
        {
          context.nodeSet( drainFaucetNode, 'accessibleName', strings.drainFaucetAccessibleName() );
          context.nodeSet( drainFaucetNode, 'helpText', strings.drainFaucetHelpText() );
          context.nodeSet( drainFaucetNode, 'pdomCreateAriaValueText', value => {

            // reverseAlternativeInput is used, which makes the provided value 'inverted' - we need to re-invert it
            // to describe it correctly.
            // TODO: This is confusing, make better? The callback should provide an appropriate value to use.
            const actualValue = 0.25 - value;
            return strings.faucetAriaValueText( flowRateToFaucetOpenEnum( actualValue ) );
          } );

          // 10 steps to fully open; 20 small steps; 2 big steps
          context.nodeSet( drainFaucetNode, 'keyboardStep', 0.25 / 10 );
          context.nodeSet( drainFaucetNode, 'shiftKeyboardStep', 0.25 / 20 );
          context.nodeSet( drainFaucetNode, 'pageKeyboardStep', 0.25 / 2 );
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
          solutionDescriptionParentNode,
          phMeterHeading,
          phMeterDescriptionParentNode,
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
