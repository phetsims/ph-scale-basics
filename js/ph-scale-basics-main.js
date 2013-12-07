// Copyright 2002-2013, University of Colorado Boulder

/**
 * Main entry point for the 'pH Scale: Basics' sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var BasicsScreen = require( 'PH_SCALE/basics/BasicsScreen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );

  // strings
  var simTitle = 'scisaB :elacS pH';//require( 'string!PH_SCALE/ph-scale-basics.name' ); //XXX fix this

  var simOptions = {
    credits: {
      leadDesign: 'Yuen-ying Carpenter',
      softwareDevelopment: 'Chris Malley',
      designTeam: 'Emily B. Moore, Ariel Paul, Julia Chamberlain, Katherine Perkins, Trish Loeblein',
      graphicArts: 'Sharon Siman-Tov',
      thanks: 'Conversion of this simulation to HTML5 was funded by the Royal Society of Chemistry.'
    }
  };

  // Appending '?dev' to the URL will enable developer-only features.
  if ( window.phetcommon.getQueryParameter( 'dev' ) ) {
    simOptions = _.extend( {
      // add dev-specific options here
    }, simOptions );
  }

  SimLauncher.launch( function() {
    var sim = new Sim( simTitle, [ new BasicsScreen() ], simOptions );
    sim.start();
  } );
} );