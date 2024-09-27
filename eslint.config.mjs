// Copyright 2024, University of Colorado Boulder

/**
 * ESLint configuration for ph-scale-basics.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import simEslintConfig from '../chipper/eslint/sim.eslint.config.mjs';

export default [
  ...simEslintConfig,
  {
    files: [
      '**/*.ts'
    ],
    rules: {
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {

          // TODO: For prototyping, I wanted to use ts-expect-error, see https://github.com/phetsims/joist/issues/941
          'ts-expect-error': false,
          'ts-ignore': true,
          'ts-check': true,
          'ts-nocheck': true
        }
      ]
    }
  }
];