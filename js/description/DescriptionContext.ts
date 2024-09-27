// Copyright 2024, University of Colorado Boulder

/**
 * Implements abstraction for setting description content in a simulation.
 * Taken from DescriptionContext in joist, but using more in-sim code instead
 * of a plugin style.
 *
 * NOTE: Would live in joist. This is a prototype for more scalable interactive description.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import TReadOnlyProperty, { PropertyLazyLinkListener, PropertyLinkListener, PropertyListener } from '../../../axon/js/TReadOnlyProperty.js';
import TEmitter, { TEmitterListener, TReadOnlyEmitter } from '../../../axon/js/TEmitter.js';
import TProperty from '../../../axon/js/TProperty.js';
import Multilink, { UnknownMultilink } from '../../../axon/js/Multilink.js';
import phScaleBasics from '../phScaleBasics.js';
import ScreenDescriptionLogic from './ScreenDescriptionLogic.js';
import ScreenView from '../../../joist/js/ScreenView.js';
import TModel from '../../../joist/js/TModel.js';
import localeProperty, { Locale } from '../../../joist/js/i18n/localeProperty.js';
import { Node, NodeOptions } from '../../../scenery/js/imports.js';
import DerivedProperty from '../../../axon/js/DerivedProperty.js';
import CallbackTimer, { CallbackTimerOptions } from '../../../axon/js/CallbackTimer.js';
import Utterance, { UtteranceOptions } from '../../../utterance-queue/js/Utterance.js';
import LocalizedString from '../../../chipper/js/LocalizedString.js';
import { AnyScreen } from '../../../joist/js/Screen.js';

export type DescriptionStrings = {
  locale: Locale;
};

export default class DescriptionContext {

  // Collections of observables and things that need to be unregistered when the context changes (new screen or new).
  private readonly links: Link[] = [];
  private readonly listens: Listen[] = [];
  private readonly assignments: Assignment[] = [];
  private readonly propertyAssignments: PropertyAssignment[] = [];
  private readonly multilinks: UnknownMultilink[] = [];
  private readonly disposables: { dispose(): void }[] = [];

  private static readonly stringsMap = new Map<Locale, DescriptionStrings>();
  private static readonly logicMap = new Map<AnyScreen, ScreenDescriptionLogic<TModel, ScreenView>>();
  private static activeLogic: ScreenDescriptionLogic<TModel, ScreenView> | null = null;
  private static activeContext: DescriptionContext | null = null;

  /**
   * When sim startup is complete, watch the localeProperty so logic and strings can reload whenever the locale changes.
   */
  public static startupComplete(): void {
    localeProperty.link( () => {
      if ( DescriptionContext.activeLogic ) {
        DescriptionContext.loadScreen( DescriptionContext.activeLogic.screen );
      }
    } );
  }

  /**
   * Load descriptions for a screen.
   */
  private static loadScreen( screen: AnyScreen ): void {

    if ( DescriptionContext.activeLogic ) {
      DescriptionContext.activeLogic.dispose();
      DescriptionContext.activeLogic = null;
    }

    if ( DescriptionContext.activeContext ) {
      DescriptionContext.activeContext.dispose();
      DescriptionContext.activeContext = null;
    }

    // By default, this grabs the chosen locale according to the localeProperty
    const fallbackLocales = LocalizedString.getLocaleFallbacks();

    const strings: DescriptionStrings = {} as DescriptionStrings;
    let addedStrings = false;

    // Search in locale fallback order for the best description strings to use. We'll pull out each individual
    // function with fallback.
    for ( let i = fallbackLocales.length - 1; i >= 0; i-- ) {
      const locale = fallbackLocales[ i ];

      if ( DescriptionContext.stringsMap.has( locale ) ) {
        addedStrings = true;

        const localeStrings = DescriptionContext.stringsMap.get( locale )!;
        for ( const key of Object.keys( localeStrings ) ) {
          // @ts-expect-error
          strings[ key ] = localeStrings[ key ];
        }
      }
    }

    if ( !addedStrings ) {
      return;
    }

    // A new context with empty lists of links, listens, assignments, and disposables
    DescriptionContext.activeContext = new DescriptionContext();

    const logic = DescriptionContext.logicMap.get( screen )!;
    DescriptionContext.activeLogic = logic;

    logic.createDescriptions( DescriptionContext.activeContext, strings );
  }

  /**
   * Registers a link, that can be easily unlinked when descriptions are disposed.
   */
  public link( property: TReadOnlyProperty<unknown>, listener: PropertyLinkListener<unknown> ): void {
    // TS just... lets us do this?
    property.link( listener );

    this.links.push( new Link( property, listener ) );
  }

  public lazyLink( property: TReadOnlyProperty<unknown>, listener: PropertyLazyLinkListener<unknown> ): void {
    // TS just... lets us do this?
    property.lazyLink( listener );

    this.links.push( new Link( property, listener ) );
  }

  public unlink( property: TReadOnlyProperty<unknown>, listener: PropertyLazyLinkListener<unknown> ): void {
    property.unlink( listener );

    const index = this.links.findIndex( link => link.property === property && link.listener === listener );

    assert && assert( index >= 0 );

    this.links.splice( index, 1 );
  }

  public createDerivedProperty( dependencies: TReadOnlyProperty<unknown>[], derivation: ( ...args: unknown[] ) => unknown ): TReadOnlyProperty<unknown> {
    const derivedProperty = DerivedProperty.deriveAny( dependencies, derivation );

    this.disposables.push( derivedProperty );

    return derivedProperty;
  }

  public multilink( dependencies: Readonly<TReadOnlyProperty<unknown>[]>, callback: ( ...args: unknown[] ) => void ): UnknownMultilink {
    const multilink = Multilink.multilinkAny( dependencies, callback );

    this.multilinks.push( multilink );

    return multilink;
  }

  public addListener( emitter: TReadOnlyEmitter<unknown[]>, listener: TEmitterListener<unknown[]> ): void {
    emitter.addListener( listener );

    this.listens.push( new Listen( emitter, listener ) );
  }

  public removeListener( emitter: TEmitter<unknown[]>, listener: TEmitterListener<unknown[]> ): void {
    emitter.removeListener( listener );

    const index = this.listens.findIndex( listen => listen.emitter === emitter && listen.listener === listener );

    assert && assert( index >= 0 );

    this.listens.splice( index, 1 );
  }

  public nodeSet( node: Node, property: unknown, value: unknown ): void {
    const index = this.assignments.findIndex( assignment => assignment.target === node && assignment.property === property );
    if ( index < 0 ) {

      // @ts-expect-error
      this.assignments.push( new Assignment( node, property, node[ property ] ) );
    }

    // eslint-disable-next-line phet/no-simple-type-checking-assertions
    assert && assert( typeof property === 'string', 'Node property name for the set should be a string' );

    // @ts-expect-error
    node[ property ] = value;
  }

  public propertySet( property: TProperty<unknown>, value: unknown ): void {
    const index = this.propertyAssignments.findIndex( assignment => assignment.property === property );
    if ( index < 0 ) {
      this.propertyAssignments.push( new PropertyAssignment( property, property.value ) );
    }

    property.value = value;
  }

  public createCallbackTimer( options?: CallbackTimerOptions ): CallbackTimer {
    const callbackTimer = new CallbackTimer( options );

    this.disposables.push( callbackTimer );

    return callbackTimer;
  }

  public createUtterance( options?: UtteranceOptions ): Utterance {
    const utterance = new Utterance( options );
    this.disposables.push( utterance );
    return utterance;
  }

  /**
   * Creates a Node through the context.
   *
   * TODO: Consider making the tagName required for this context? See https://github.com/phetsims/joist/issues/941
   */
  public createNode( options?: NodeOptions ): Node {
    const node = new Node( options );
    this.disposables.push( node );
    return node;
  }

  /**
   * Unlink/unregister all links, listens, assignments, and disposables.
   */
  public dispose(): void {
    while ( this.links.length ) {
      const link = this.links.pop()!;

      if ( !link.property.isDisposed ) {
        link.property.unlink( link.listener );
      }
    }
    while ( this.listens.length ) {
      const listen = this.listens.pop()!;

      // @ts-expect-error
      if ( !listen.emitter.isDisposed ) {
        listen.emitter.removeListener( listen.listener );
      }
    }
    while ( this.assignments.length ) {
      const assignment = this.assignments.pop()!;

      if ( !assignment.target.isDisposed ) {

        // @ts-expect-error
        assignment.target[ assignment.property ] = assignment.initialValue;
      }
    }
    while ( this.propertyAssignments.length ) {
      const assignment = this.propertyAssignments.pop()!;

      if ( !assignment.property.isDisposed ) {
        assignment.property.value = assignment.initialValue;
      }
    }
    while ( this.multilinks.length ) {
      const multilink = this.multilinks.pop()!;

      // @ts-expect-error TODO how to support this? https://github.com/phetsims/joist/issues/941
      if ( !multilink.isDisposed ) {
        multilink.dispose();
      }
    }

    // Dispose after disconnecting assignments so that everything is still usable when disconnecting.
    while ( this.disposables.length ) {
      const disposable = this.disposables.pop()!;

      disposable.dispose();
    }
  }

  public static registerStrings( strings: DescriptionStrings ): DescriptionStrings {
    DescriptionContext.stringsMap.set( strings.locale, strings );
    return strings;
  }

  public static registerLogic( logic: ScreenDescriptionLogic<TModel, ScreenView> ): void {
    DescriptionContext.logicMap.set( logic.screen, logic );
    DescriptionContext.loadScreen( logic.screen );
  }
}

class Link {
  public constructor(
    public readonly property: TReadOnlyProperty<unknown>,
    public readonly listener: PropertyListener<unknown>
  ) {}
}

class Listen {
  public constructor(
    public readonly emitter: TReadOnlyEmitter<unknown[]>,
    public readonly listener: TEmitterListener<unknown[]>
  ) {}
}

class Assignment {
  public constructor(
    public readonly target: Node,
    public readonly property: keyof Node,
    public readonly initialValue: string
  ) {}
}

class PropertyAssignment {
  public constructor(
    public readonly property: TProperty<unknown>,
    public readonly initialValue: unknown
  ) {}
}

phScaleBasics.register( 'DescriptionContext', DescriptionContext );