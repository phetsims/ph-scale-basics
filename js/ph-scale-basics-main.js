// Copyright 2013-2015, University of Colorado Boulder

/**
 * Main entry point for the 'pH Scale: Basics' sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var MacroScreen = require( 'PH_SCALE/macro/MacroScreen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );

  // strings
  var phScaleBasicsTitleString = require( 'string!PH_SCALE_BASICS/ph-scale-basics.title' );

  var simOptions = {
    credits: {
      leadDesign: 'Yuen-ying Carpenter',
      softwareDevelopment: 'Chris Malley (PixelZoom, Inc.)',
      team: 'Julia Chamberlain, Trish Loeblein, Emily B. Moore, Ariel Paul, Katherine Perkins',
      graphicArts: 'Sharon Siman-Tov',
      qualityAssurance: 'Steele Dalton, Bryce Griebenow, Elise Morgan, Oliver Orejola, Benjamin Roberts, Bryan Yoelin',
      thanks: 'Conversion of this simulation to HTML5 was funded in part by the Royal Society of Chemistry.'
    }
  };

  SimLauncher.launch( function() {
    var sim = new Sim( phScaleBasicsTitleString, [ new MacroScreen( { autoFillVolume: 0 } ) ], simOptions );
    sim.start();
  } );
} );