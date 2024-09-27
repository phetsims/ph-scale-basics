// Copyright 2013-2024, University of Colorado Boulder

/**
 * Main entry point for the 'pH Scale: Basics' sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import PHScaleConstants from '../../ph-scale/js/common/PHScaleConstants.js';
import PHScaleQueryParameters from '../../ph-scale/js/common/PHScaleQueryParameters.js';
import MacroScreen from '../../ph-scale/js/macro/MacroScreen.js';
import Alerter from '../../scenery-phet/js/accessibility/describers/Alerter.js';
import Tandem from '../../tandem/js/Tandem.js';
import PHScaleBasicsDescriptionLogic from './description/ph-scale-basics-description-logic.js'; // eslint-disable-line phet/default-import-match-filename
import PHScaleBasicsDescriptionStrings_en from './description/ph-scale-basics-description-strings_en.js'; // eslint-disable-line phet/default-import-match-filename
import PHScaleBasicsDescriptionStrings_es from './description/ph-scale-basics-description-strings_es.js'; // eslint-disable-line phet/default-import-match-filename
import PhScaleBasicsStrings from './PhScaleBasicsStrings.js';
import MacroScreenDescriptionLogic from './description/MacroScreenDescriptionLogic.js';
import DescriptionContext from './description/DescriptionContext.js';

// If autofill query parameter was not in the URL, change the default.
if ( !QueryStringMachine.containsKey( 'autofill' ) ) {
  PHScaleQueryParameters.autofill = false;
}

simLauncher.launch( () => {

  //TODO https://github.com/phetsims/ph-scale/issues/294
  if ( phet.chipper.queryParameters.supportsDescriptionPlugin ) {
    PHScaleBasicsDescriptionStrings_en();
    PHScaleBasicsDescriptionStrings_es();
    PHScaleBasicsDescriptionLogic();

    phet.log && phet.log( Alerter );

    phet.log && phet.log( PHScaleBasicsDescriptionStrings_en.toString() );
    phet.log && phet.log( PHScaleBasicsDescriptionLogic.toString() );
  }

  const macroScreen = new MacroScreen( Tandem.ROOT.createTandem( 'macroScreen' ) );

  const screens = [
    macroScreen
  ];

  const sim = new Sim( PhScaleBasicsStrings[ 'ph-scale-basics' ].titleStringProperty, screens, {
    credits: PHScaleConstants.CREDITS,
    phetioDesigned: true
  } );

  sim.isConstructionCompleteProperty.lazyLink( isConstructionComplete => {

    // Load strings by registering them to the DescriptionContext
    PHScaleBasicsDescriptionStrings_en();
    PHScaleBasicsDescriptionStrings_es();

    // Wait until construction is complete to access the model and view
    const logic = new MacroScreenDescriptionLogic( macroScreen );

    // Register the logic to the context for reloading logic
    DescriptionContext.registerLogic( logic );

    DescriptionContext.startupComplete();
  } );

  sim.start();
} );