// Copyright 2013-2019, University of Colorado Boulder

/**
 * Main entry point for the 'pH Scale: Basics' sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const MacroScreen = require( 'PH_SCALE/macro/MacroScreen' );
  const PHScaleConstants = require( 'PH_SCALE/common/PHScaleConstants' );
  const Sim = require( 'JOIST/Sim' );
  const SimLauncher = require( 'JOIST/SimLauncher' );

  // strings
  const phScaleBasicsTitleString = require( 'string!PH_SCALE_BASICS/ph-scale-basics.title' );

  const simOptions = {
    credits: PHScaleConstants.CREDITS
  };

  SimLauncher.launch( () => {
    const screens = [
      new MacroScreen( { autoFillVolume: 0 } )
    ];
    const sim = new Sim( phScaleBasicsTitleString, screens, simOptions );
    sim.start();
  } );
} );