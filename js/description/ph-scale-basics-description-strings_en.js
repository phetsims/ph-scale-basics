// Copyright 2024, University of Colorado Boulder

// @author Jonathan Olson <jonathan.olson@colorado.edu>
// @author Taliesin Smith <taliesin.smith@colorado.edu>

/* eslint-disable */

export default () => {

  /*********************************************
   * Enumeration Mappings (enumeration value => string)
   *********************************************/

  const soluteMap = {
    batteryAcid: 'battery acid',
    blood: 'blood',
    chickenSoup: 'chicken soup',
    coffee: 'coffee',
    drainCleaner: 'drain cleaner',
    handSoap: 'hand soap',
    milk: 'milk',
    orangeJuice: 'orange juice',
    soda: 'soda',
    spit: 'spit',
    vomit: 'vomit',
    water: 'water'
  };

// Soute/Solution Colors
  const soluteColorMap = {
    brightYellow: 'bright yellow',
    red: 'red',
    darkYellow: 'dark yellow',
    brown: 'brown',
    lavender: 'lavender',
    white: 'white',
    orange: 'orange',
    limeGreen: 'lime green',
    colorless: 'colorless',
    salmon: 'salmon'
  };

// Beaker Volume
  const totalVolumeMap = {
    empty: 'empty',
    nearlyEmpty: 'nearly empty',
    underHalfFull: 'under half full',
    halfFull: 'half full',
    overHalfFull: 'over half full',
    nearlyFull: 'nearly full',
    full: 'full'
  };

  // Added Water Volume
  const addedWaterVolumeMap = {
    no: 'no',
    aTinyBitOf: 'a tiny bit of',
    aLittle: 'a little',
    some: 'some',
    equalAmountsOf: 'equal amounts of',
    aFairAmountOf: 'a fair amount of',
    lotsOf: 'lots of',
    mostly: 'mostly'
  };

// Solutions/Solutes
  const phValueMap = {
    none: 'probe is not in beaker',
    extremelyAcidic: 'extremely acidic',
    highlyAcidic: 'highly acidic',
    moderatelyAcidic: 'moderately acidic',
    slightlyAcidic: 'slightly acidic',
    neutral: 'neutral',
    slightlyBasic: 'slightly basic',
    moderatelyBasic: 'moderately basic',
    highlyBasic: 'highly basic',
    extremelyBasic: 'extremely basic'
  };

// Flow-rate descriptions for water faucet and drain.
// TODO: Add a qualitative region for 5 open regions to match 5 key presses.
  const flowRateMap = {
    closed: 'closed',
    openATinyBit: 'open a tiny bit',
    openALittle: 'open a little',  
    somewhatOpen: 'somewhat open', 
    halfwayOpen: 'halfway open', 
    openALot: 'open a lot',
    fullyOpen: 'fully open'
  };

  return phet.joist.DescriptionContext.registerStrings( {
    locale: 'en',

    /*********************************************
     * Screen Summary State Descriptions
     *********************************************/

    screenSummaryP1() {
      return 'The Play Area contains a drainable beaker, a solution dropper, water faucet, and a movable pH probe. Water faucet and solution dropper sit above the beaker. The dropper dispenses a number of everyday liquids one at a time.';
    },
    screenSummaryP2() {
      return 'The Control Area has a button to reset the sim.';
    },
    screenSummaryP3() {
      return 'Add solution to beaker and play.';
    },
    dynamicScreenSummary(
      solute,
      totalVolumeEnum,
      solutionPH,
      meterPH,
      solutionPHEnum,
      solutionTotalVolume,
      soluteColorEnum,
      addedWaterVolumeEnum
    ) { // Question: Where should case logic go? Here or in logic.
      if ( totalVolumeEnum === 'empty' ) {

        // There is no water or solute in the beaker.
        return `ACurrently, beaker is ${totalVolumeMap[ totalVolumeEnum ]}.`;
      }
      else if ( solute === 'water' ) {

        // There is only water in the beaker.
        if ( meterPH === null ) {

          // The meter is not measuring any value.
          return `BCurrently, beaker contains ${solutionTotalVolume} liters of ${soluteMap[ solute ]} and is ${totalVolumeMap[ totalVolumeEnum ]}.`;
        }
        else {

          // The meater is measuring a value.
          return `CCurrently, beaker contains ${solutionTotalVolume} liters of ${soluteMap[ solute ]} and is ${totalVolumeMap[ totalVolumeEnum ]}. ${soluteMap[ solute ]} has a pH of ${solutionPH} and is ${phValueMap[ solutionPHEnum ]}.`;
        }
      }
      else if ( addedWaterVolumeEnum === 'equalAmountsOf' ) {

        // There are equal amounts of water and solute in the beaker.
        if ( meterPH === null ) {

          // The meter is not measuring any value.
          return `FCurrently, ${soluteMap[ solute ]} solution is ${soluteColorMap[ soluteColorEnum ]} with ${addedWaterVolumeMap[ addedWaterVolumeEnum ]} ${soluteMap[ solute ]} and added water. Beaker is ${totalVolumeMap[ totalVolumeEnum ]} at ${solutionTotalVolume} liters.`;
        }
        else {

          // The meter is measuring a value.
          return `GCurrently, ${soluteMap[ solute ]} solution has a pH of ${solutionPH} and is ${phValueMap[ solutionPHEnum ]}. Solution is ${soluteColorMap[ soluteColorEnum ]} with ${addedWaterVolumeMap[ addedWaterVolumeEnum ]} ${soluteMap[ solute ]} and added water. Beaker is ${totalVolumeMap[ totalVolumeEnum ]} at ${solutionTotalVolume} liters.`;
        }
      }
      else if ( meterPH === null ) {

        // There is a solute in the beaker and it is not an equal amount of water.
        if ( addedWaterVolumeEnum === 'no' || soluteColorEnum === 'colorless' ) {

          // There is no water or the solute has no color, describe the color of the solution
          // In this case, there is some amount of water and solute (other than equal)
          // ToDo: need color Map and dilutionMap parameters.
          // Currently, {{spit}} solution is {{clear}} with {{lots of}} added water. Beaker is {{close to full}} at {{1.00}} liters.
          return `D1Currently, ${soluteMap[ solute ]} solution is ${soluteColorMap[ soluteColorEnum ]} with ${addedWaterVolumeMap[ addedWaterVolumeEnum ]} added water. Beaker is ${totalVolumeMap[ totalVolumeEnum ]} at ${solutionTotalVolume} liters.`;
        }
        else {

          // There is water and solute, and the solute has a color - describe that it is of a lighter color.
          return `D2Currently, ${soluteMap[ solute ]} solution is lighter ${soluteColorMap[ soluteColorEnum ]} with ${addedWaterVolumeMap[ addedWaterVolumeEnum ]} added water. Beaker is ${totalVolumeMap[ totalVolumeEnum ]} at ${solutionTotalVolume} liters.`;
        }
      }
      else {

        if ( addedWaterVolumeEnum === 'no' || soluteColorEnum === 'colorless' ) {

          // There is no water or the solute has no color, describe the color of the solution
          return `E1Currently, ${soluteMap[ solute ]} solution has a pH of ${solutionPH} and is ${phValueMap[ solutionPHEnum ]}. Solution is ${soluteColorMap[ soluteColorEnum ]} with ${addedWaterVolumeMap[ addedWaterVolumeEnum ]} added water. Beaker is ${totalVolumeMap[ totalVolumeEnum ]} at ${solutionTotalVolume} liters.`;
        }
        else {

          // There is water and solute, and the solute has a color - describe that it is of a lighter color.
          return `E2Currently, ${soluteMap[ solute ]} solution has a pH of ${solutionPH} and is ${phValueMap[ solutionPHEnum ]}. Solution is lighter ${soluteColorMap[ soluteColorEnum ]} with ${addedWaterVolumeMap[ addedWaterVolumeEnum ]} added water. Beaker is ${totalVolumeMap[ totalVolumeEnum ]} at ${solutionTotalVolume} liters.`;
        }
      }
    },

    /*********************************************
     * Play Area State Descriptions
     *********************************************/

    beakerHeading() {
      return 'Solution in Beaker';
    },
    phMeterHeading() {
      return 'pH Meter and Read Out';
    },
    phMeterProbeAccessibleName() { return 'pH Probe'; },
    phMeterProbeGrabAccessibleName() { return 'Grab pH Probe'; },
    phMeterProbeHelpText() { return 'Look for pH probe to play. Once grabbed, use keyboard shortcuts to move probe. Space to release.'; },
    controlsHeading() {
      return 'Solution and pH Meter Controls';
    },
    soluteComboBoxAccessibleName() {
      return 'Solution';
    },
    soluteName( solute ) {
      return soluteMap[ solute ];
    },
    soluteComboBoxHelpText() { return 'Choose an everyday liquid for the dropper.'; },
    dropperAccessibleName() { return 'Dropper'; },
    waterFaucetAccessibleName() { return 'Water Faucet'; },
    waterFaucetHelpText() { return 'Add water to solution in beaker.'; },
    drainFaucetAccessibleName() { return 'Drain'; },
    drainFaucetHelpText() { return 'Open to drain solution from beaker.'; },
    faucetAriaValueText(
      flowRateEnum
    ) {
      // E.g. on focus: Water Faucet, closed
      return `${flowRateMap[ flowRateEnum ]}`;
    },

    /*********************************************
     * Control Area State Descriptions
     *********************************************/

    /*********************************************
     * Object Responses
     *********************************************/

    phMeterProbeMovedAlert() { return 'The probe moved!' },

    dropperDispensingAlert(
      isDispensing
    ) {
      return isDispensing ? 'Dispensing' : 'Not dispensing';
    },

    /*********************************************
     * Context Responses
     *********************************************/

    faucetContextResponse( waterFlowing ) {
      return waterFlowing ? 'Water is flowing' : 'Water is off.';
    },

    liquidChangingAlert(
      goingUp,
      totalVolumeValue
    ) {
      return `Level going ${goingUp ? 'up' : 'down'}, now at ${totalVolumeValue} liters.`;
    },
    liquidChangingDoneAlert(
      totalVolumeEnum
    ) {
      return `Level stable, now at ${totalVolumeMap[ totalVolumeEnum ]}.`;
    }
  } );
};