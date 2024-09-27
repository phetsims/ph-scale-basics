// Copyright 2024, University of Colorado Boulder

/**
 * Base class for a ScreenDescriptionLogic. Provides abstractions for setting up descriptions for a screen.
 * Would be mostly implemented by subclasses for a particular screen.
 *
 * This would presumably live in joist.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import TModel from '../../../joist/js/TModel.js';
import ScreenView from '../../../joist/js/ScreenView.js';
import { AnyScreen } from '../../../joist/js/Screen.js';
import phScaleBasics from '../phScaleBasics.js';
import IntentionalAny from '../../../phet-core/js/types/IntentionalAny.js';

export default class ScreenDescriptionLogic<M extends TModel, V extends ScreenView> {

  public readonly screen: AnyScreen;

  protected readonly model: M;
  protected readonly view: V;

  public constructor( screen: AnyScreen ) {
    this.screen = screen;

    this.model = screen.model;

    // TODO, why is the assertion necessary here? https://github.com/phetsims/joist/issues/941
    this.view = screen.view as V;
  }

  public createDescriptions( context: IntentionalAny, strings: IntentionalAny ): void {
    // no-op
  }

  /**
   * Dispose of this ScreenDescriptionLogic.
   */
  public dispose(): void {
    // no-op
  }
}

phScaleBasics.register( 'ScreenDescriptionLogic', ScreenDescriptionLogic );