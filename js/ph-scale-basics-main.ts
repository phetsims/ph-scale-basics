// Copyright 2013-2023, University of Colorado Boulder

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
import Tandem from '../../tandem/js/Tandem.js';
import PhScaleBasicsStrings from './PhScaleBasicsStrings.js';
import DescriptionContext from '../../joist/js/DescriptionContext.js';
import Alerter from '../../scenery-phet/js/accessibility/describers/Alerter.js';
import PHScaleBasicsDescriptionStrings_en from './description/ph-scale-basics-description-strings_en.js'; // eslint-disable-line default-import-match-filename
import PHScaleBasicsDescriptionStrings_es from './description/ph-scale-basics-description-strings_es.js'; // eslint-disable-line default-import-match-filename
import PHScaleBasicsDescriptionLogic from './description/ph-scale-basics-description-logic.js'; // eslint-disable-line default-import-match-filename

// If autofill query parameter was not in the URL, change the default.
if ( !QueryStringMachine.containsKey( 'autofill' ) ) {
  PHScaleQueryParameters.autofill = false;
}

simLauncher.launch( () => {

  if ( phet.chipper.queryParameters.supportsDescriptionPlugin ) {
    PHScaleBasicsDescriptionStrings_en();
    PHScaleBasicsDescriptionStrings_es();
    PHScaleBasicsDescriptionLogic();

    phet.log && phet.log( Alerter );

    phet.log && phet.log( PHScaleBasicsDescriptionStrings_en.toString() );
    phet.log && phet.log( PHScaleBasicsDescriptionLogic.toString() );
  }

  const screens = [
    new MacroScreen( Tandem.ROOT.createTandem( 'macroScreen' ) )
  ];

  const sim = new Sim( PhScaleBasicsStrings[ 'ph-scale-basics' ].titleStringProperty, screens, {
    credits: PHScaleConstants.CREDITS,
    phetioDesigned: true
  } );

  phet.chipper.queryParameters.supportsDescriptionPlugin && sim.isConstructionCompleteProperty.lazyLink( isConstructionComplete => {
    DescriptionContext.startupComplete();
  } );

  sim.start();
} );