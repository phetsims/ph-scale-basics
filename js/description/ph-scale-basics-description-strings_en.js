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
    batteryAcidBrightYellow: 'bright yellow', 
    bloodRed: 'red',
    chickenSoupDarkYellow: 'dark yellow',
    coffeeBrown: 'brown',
    drainCleanerBrightYellow: 'bright yellow',
    handSoapLavender: 'lavender',
    milkWhite: 'white',
    orangeJuiceOrange: 'orange',
    sodaLimeGreen: 'lime green',
    spitClear: 'clear',
    vomitSalmon: 'salmon',
    waterClear: 'clear'
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



  const flowRateMap = {
    off: 'off',
    slow: 'slow',
    fast: 'fast'
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
      solutionTotalVolume
    ) { // Question: Whaer should case logic go? Here or in logic.
      if ( totalVolumeEnum === 'empty' ) {
        // Empty case
        return `ACurrently, beaker is ${totalVolumeMap[ totalVolumeEnum ]}.`;
      }
      else if ( solute === 'water' ) {
       if ( meterPH === null ) {
              return `BCurrently, beaker contains ${solutionTotalVolume} liters of ${soluteMap[ solute ]} and is ${totalVolumeMap[ totalVolumeEnum ]}.`;
          }
        else {
            return `CCurrently, beaker contains ${solutionTotalVolume} liters of ${soluteMap[ solute ]} and is ${totalVolumeMap[ totalVolumeEnum ]}. ${soluteMap[ solute ]} has a pH of ${solutionPH} and is ${phValueMap[ solutionPHEnum ]}.`;
          }

      }
      else if ( meterPH === null ) {
        // ToDo: need color Map and dilutionMap parameters.
        // Currently, {{spit}} solution is {{clear}} with {{lots of}} added water. Beaker is {{close to full}} at {{1.00}} liters.
        return `DCurrently, ${soluteMap[ solute ]} solution. Beaker is ${totalVolumeMap[ totalVolumeEnum ]} at ${solutionTotalVolume} liters.`;

      }
      else {
        // Not empty case: Currently, {{spit}} solution has a pH of {{7.02}} and is {{almost neutral}}. Solution is {{clear}} with {{lots of}} added water. Beaker is {{close to full}} at {{1.00}} liters.
        return `ECurrently, ${soluteMap[ solute ]} solution has a pH of ${solutionPH} and is ${phValueMap[ solutionPHEnum ]}. Beaker is ${totalVolumeMap[ totalVolumeEnum ]} at ${solutionTotalVolume} liters.`;
      }
    },

    /*********************************************
     * Play Area State Descriptions
     *********************************************/

    beakerHeading() {
      return 'The Beaker';
    },
    phMeterHeading() {
      return 'pH Meter and Read Out';
    },
    phMeterProbeAccessibleName() { return 'pH Probe'; },
   phMeterProbeHelpText() { return 'Look for pH probe to play. Once grabbed, use keyboard shortcuts to move probe. Space to release.'; },
    controlsHeading() {
      return 'Beaker and pH Meter Controls';
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
      return `Faucet is ${flowRateMap[ flowRateEnum ]}`;
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