// Copyright 2024, University of Colorado Boulder

// @author Jonathan Olson <jonathan.olson@colorado.edu>

// eslint-disable

export default () => {
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
    screenSummary() {
      return 'Place description of the screen here, or break into multiple paragraphs';
    },
    screenSummarySimStateDescription(
      solute,
      totalVolumeEnum
    ) {
      return `The solute is ${soluteMap[ solute ]}, and the total volume is ${totalVolumeMap[ totalVolumeEnum ]}.`;
    },
    soluteComboBoxAccessibleName() {
      return 'Solute';
    },
    soluteName( solute ) {
      return soluteMap[ solute ];
    },
    waterFaucetAccessibleName() { return 'water faucet'; },
    drainFaucetAccessibleName() { return 'drain faucet'; },
    faucetAriaValueText(
      flowRateEnum
    ) {
      return `Faucet is ${flowRateMap[ flowRateEnum ]}`;
    },
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
    },
    dropperDispensingAlert(
      isDispensing
    ) {
      return isDispensing ? 'Dispensing' : 'Not dispensing';
    }
  } );
};