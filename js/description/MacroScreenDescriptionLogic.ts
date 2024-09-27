// Copyright 2024, University of Colorado Boulder

/**
 * Implements descriptions for the MacroScreen of ph-scale.
 *
 * NOTE: Would live in ph-scale as it describes a screen in ph-scale (but we are testing
 * and branching in ph-scale-basics).
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import MacroScreen from '../../../ph-scale/js/macro/MacroScreen.js';
import MacroModel from '../../../ph-scale/js/macro/model/MacroModel.js';
import MacroScreenView from '../../../ph-scale/js/macro/view/MacroScreenView.js';
import IntentionalAny from '../../../phet-core/js/types/IntentionalAny.js';
import phScaleBasics from '../phScaleBasics.js';
import DescriptionContext from './DescriptionContext.js';
import ScreenDescriptionLogic from './ScreenDescriptionLogic.js';

/*********************************************
 * Constants
 *********************************************/

// TODO: Only need this because of ComboBox, we should be able to remove it. See https://github.com/phetsims/joist/issues/941
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

/*************************************************************
 * Enumeration Mappings (value -> enum string)
 *************************************************************/

// Qualitative Total Volume Ranges
const totalVolumeToEnum = ( totalVolume: number ) => {
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
const phValueToEnum = ( phValue: number ) => {
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
const addedWaterVolumeToEnum = ( addedWaterVolume: number, solutionTotalVolume: number ) => {
  const percentAddedWater = ( addedWaterVolume / solutionTotalVolume );
  if ( percentAddedWater === 0 ) {
    return 'no';
  }
  else if ( percentAddedWater <= 0.1 ) {
    return 'aTinyBitOf';
  }
  else if ( percentAddedWater <= 0.25 ) {
    return 'aLittle';
  }
  else if ( percentAddedWater < 0.495 ) {
    return 'some';
  }
  else if ( percentAddedWater < 0.505 ) {
    return 'equalAmountsOf';
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
const soluteToColorEnum = ( solute: string ) => {
  if ( solute === 'BATTERY_ACID' || solute === 'DRAIN_CLEANER' ) {
    return 'brightYellow';
  }
  else if ( solute === 'BLOOD' ) {
    return 'red';
  }
  else if ( solute === 'CHICKEN_SOUP' ) {
    return 'darkYellow';
  }
  else if ( solute === 'COFFEE' ) {
    return 'brown';
  }
  else if ( solute === 'HAND_SOAP' ) {
    return 'lavender';
  }
  else if ( solute === 'MILK' ) {
    return 'white';
  }
  else if ( solute === 'ORANGE_JUICE' ) {
    return 'orange';
  }
  else if ( solute === 'SODA' ) {
    return 'limeGreen';
  }
  else if ( solute === 'VOMIT' ) {
    return 'salmon';
  }
  else {
    return 'colorless';
  }
};

const flowRateToEnum = ( flowRate: number ) => {
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

export default class MacroScreenDescriptionLogic extends ScreenDescriptionLogic<MacroModel, MacroScreenView> {
  public constructor( macroScreen: MacroScreen ) {
    super( macroScreen );
  }

  /**
   * Sets descriptions for the MacroScreen. Uses the context to register listeners (that will be
   * unregistered when the locale changes).
   * TODO: Type the IntentionalAny? https://github.com/phetsims/joist/issues/941
   */
  public override createDescriptions( context: DescriptionContext, strings: IntentionalAny ): void {

    //*************************************************************
    // Variables that access everything you want to describe
    //*************************************************************

    // Model components
    const addedWaterVolumeProperty = this.model.solution.waterVolumeProperty;
    const solutionTotalVolumeProperty = this.model.solution.totalVolumeProperty;
    const soluteProperty = this.model.dropper.soluteProperty;
    const solutionPHProperty = this.model.solution.pHProperty;
    const meterPHProperty = this.model.pHMeter.pHProperty;
    const isDispensingProperty = this.model.dropper.isDispensingProperty;

    // View components
    const macroScreenView = this.view;
    const beakerNode = this.view.beakerNode;
    const soluteComboBox = this.view.soluteComboBox;
    const phMeterProbeNode = this.view.phMeterNode.probeNode;
    const dropperNodeButton = this.view.dropperNode.button;
    const waterFaucetNode = this.view.waterFaucetNode.faucetNode;
    const drainFaucetNode = this.view.drainFaucetNode;
    const resetAllButtonNode = this.view.resetAllButton;

    // @ts-expect-error - need access to these nodes for pdomOrder
    const playAreaNode = this.view.pdomPlayAreaNode;

    // @ts-expect-error - need access to these nodes for pdomOrder
    const controlAreaNode = this.view.pdomControlAreaNode;

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
    context.multilink( [

      // TODO: context.get doesn't work for "This element is defined in" cases, e.g. model.solution.soluteProperty won't work, see https://github.com/phetsims/joist/issues/941
      soluteProperty,
      solutionTotalVolumeProperty,
      addedWaterVolumeProperty,
      solutionPHProperty,
      meterPHProperty
    ], (
      solute,
      solutionTotalVolume,
      addedWaterVolume,
      solutionPH,
      meterPH
    ) => {
      // @ts-expect-error
      const soluteTandemName = solute.tandemName as string;
      dynamicScreenSummaryNode.innerContent = strings.dynamicScreenSummary(
        soluteTandemName,
        totalVolumeToEnum( solutionTotalVolume as number ),
        solutionPH,
        meterPH,
        phValueToEnum( solutionPH as number ),
        solutionTotalVolume,
        soluteToColorEnum( soluteTandemName ),
        addedWaterVolumeToEnum( addedWaterVolume as number, solutionTotalVolume as number )
      );
    } );

    //*************************************************************
    // Play Area State Descriptions
    //*************************************************************
    // Beaker
    context.nodeSet( beakerNode, 'tagName', 'div' );
    context.nodeSet( beakerNode, 'labelTagName', 'h3' );
    context.nodeSet( beakerNode, 'labelContent', strings.beakerHeading() );

    //pH Meter Heading
    const phMeterHeading = context.createNode( {
      tagName: 'h3',
      innerContent: strings.phMeterHeading()
    } );
    macroScreenView.addChild( phMeterHeading );

    // pH Meter Probe
    context.nodeSet( phMeterProbeNode, 'helpText', strings.phMeterProbeHelpText() );
    context.nodeSet( phMeterProbeNode, 'accessibleName', strings.phMeterProbeAccessibleName() );

    // Controls Heading
    const controlsHeading = context.createNode( {
      tagName: 'h3',
      innerContent: strings.controlsHeading()
    } );
    macroScreenView.addChild( controlsHeading );

    // Solute ComboBox
    context.nodeSet( soluteComboBox, 'helpText', strings.soluteComboBoxHelpText() );
    context.nodeSet( soluteComboBox, 'accessibleName', strings.soluteComboBoxAccessibleName() );
    for ( const solute of solutes ) {

      // TODO: How to access this information in ComboBox? https://github.com/phetsims/joist/issues/941
      // @ts-expect-error
      context.propertySet( soluteComboBox.a11yNamePropertyMap.get( solute ), strings.soluteName( solute.tandemName ) );
    }

    // Dropper
    context.nodeSet( dropperNodeButton, 'accessibleName', strings.dropperAccessibleName() );

    // Water Faucet
    context.nodeSet( waterFaucetNode, 'accessibleName', strings.waterFaucetAccessibleName() );
    context.nodeSet( waterFaucetNode, 'helpText', strings.waterFaucetHelpText() );
    context.nodeSet( waterFaucetNode, 'pdomCreateAriaValueText', ( value: number ) => {
      return strings.faucetAriaValueText( flowRateToEnum( value ) );
    } );

    context.nodeSet( waterFaucetNode, 'keyboardStep', 0.1 );

    // Drain Faucet
    context.nodeSet( drainFaucetNode, 'accessibleName', strings.drainFaucetAccessibleName() );
    context.nodeSet( drainFaucetNode, 'helpText', strings.drainFaucetHelpText() );
    context.nodeSet( drainFaucetNode, 'pdomCreateAriaValueText', ( value: number ) => {
      return strings.faucetAriaValueText( flowRateToEnum( value ) );
    } );

    /*********************************************
     * PDOM Order
     *********************************************/

    // Play Area
    context.nodeSet( playAreaNode, 'pdomOrder', [
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
    context.nodeSet( controlAreaNode, 'pdomOrder', [
      resetAllButtonNode
    ] );

    /*********************************************
     * Object Responses
     *********************************************/

    // Demo example for simple object response
    context.lazyLink( isDispensingProperty, isDispensing => {
      dropperNodeButton.alertDescriptionUtterance( strings.dropperDispensingAlert( isDispensing ) );
    } );

    /*********************************************
     * Context Responses
     *********************************************/

    // Water faucet
    context.nodeSet( waterFaucetNode, 'pdomCreateContextResponseAlert', ( value: number ) => {

      // The value is 0.25 when 'off' and 0 when fully flowing for some reason.
      return strings.faucetContextResponse( ( 0.25 - value ) > 0 );
    } );
  }
}

phScaleBasics.register( 'MacroScreenDescriptionLogic', MacroScreenDescriptionLogic );