// Copyright 2013-2019, University of Colorado Boulder

/**
 * Main entry point for the 'pH Scale: Basics' sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var MacroScreen = require( 'PH_SCALE/macro/MacroScreen' );
  var PHScaleConstants = require( 'PH_SCALE/common/PHScaleConstants' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );

  // strings
  var phScaleBasicsTitleString = require( 'string!PH_SCALE_BASICS/ph-scale-basics.title' );

  var simOptions = {
    credits: PHScaleConstants.CREDITS
  };

  SimLauncher.launch( function() {
    var sim = new Sim( phScaleBasicsTitleString, [ new MacroScreen( { autoFillVolume: 0 } ) ], simOptions );
    sim.start();
  } );
} );