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

  const totalVolumeMap = {
    empty: 'empty',
    partiallyFilled: 'partially filled',
    full: 'full'
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
      totalVolume
    ) {
      //Currently, {{spit}} solution has a pH of {{7.02}} and is {{almost neutral}}. Solution is {{clear}} with {{lots of}} added water. Beaker is {{close to full}} at {{1.00}} liters.
      return `Currently, ${soluteMap[ solute ]} solution has a pH of ${solutionPH}. Beaker is ${totalVolumeMap[ totalVolumeEnum ]} at ${totalVolume} liters.`;
    },

    /*********************************************
     * Play Area State Descriptions
     *********************************************/

    beakerHeading() {
      return 'The Beaker';
    },
    pHMeterHeading() {
      return 'pH Meter and Read Out';
    },
    phMeterProbeAccessibleName() { return 'pH Probe'; },
    controlsHeading() {
      return 'Beaker and pH Meter Controls';
    },
    soluteComboBoxAccessibleName() {
      return 'Solution';
    },
    soluteName( solute ) {
      return soluteMap[ solute ];
    },
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