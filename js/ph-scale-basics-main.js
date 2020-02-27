// Copyright 2013-2020, University of Colorado Boulder

/**
 * Main entry point for the 'pH Scale: Basics' sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Sim from '../../joist/js/Sim.js';
import SimLauncher from '../../joist/js/SimLauncher.js';
import PHScaleConstants from '../../ph-scale/js/common/PHScaleConstants.js';
import MacroScreen from '../../ph-scale/js/macro/MacroScreen.js';
import Tandem from '../../tandem/js/Tandem.js';
import phScaleBasicsStrings from './ph-scale-basics-strings.js';

const phScaleBasicsTitleString = phScaleBasicsStrings[ 'ph-scale-basics' ].title;

const simOptions = {
  credits: PHScaleConstants.CREDITS
};

SimLauncher.launch( () => {
  const screens = [
    new MacroScreen( Tandem.ROOT.createTandem( 'macroScreen' ), { autoFillEnabled: false } )
  ];
  const sim = new Sim( phScaleBasicsTitleString, screens, simOptions );
  sim.start();
} );