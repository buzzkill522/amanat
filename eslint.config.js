import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'

// ---------------------------------------------------------------------------
// The `lint` script existed in package.json from the first commit and had
// never once run: eslint was not installed and there was no config for it to
// read. This is that config, written after the fact.
//
// The ruleset is deliberately close to the recommended defaults. This project
// already has two hand-written gates that catch the things it actually cares
// about - check:content validates the lesson JSON against the icon set and the
// quiz answer distribution, check:a11y measures every colour pairing in both
// themes - and neither of those is anything eslint could do. What eslint adds
// here is the ordinary layer underneath: a variable that is used before it is
// defined, a hook called conditionally, a shadowed binding. Those are the bugs
// this codebase has actually shipped.
//
// Two rules are switched off rather than satisfied, both for the same reason -
// they are about a type system this project does not have:
//
//   react/prop-types      - would want runtime propTypes on every component.
//                           JSX with documented props in a docstring is the
//                           house style; adding a second, weaker declaration
//                           of the same thing is not a gain.
//   react/react-in-jsx-scope - React 17+ JSX transform. Vite handles it.
// ---------------------------------------------------------------------------

export default [
  {
    // `.monogold` is a git worktree checked out INSIDE the repo - the preview
    // server only runs from within the project root, so a sibling directory
    // was not an option. It carries its own node_modules and dist, and
    // linting a second copy of the whole codebase (plus a minified bundle)
    // produced 287 errors that were all React's own shipped code.
    ignores: ['dist/**', 'node_modules/**', '.monogold/**'],
  },

  js.configs.recommended,

  // Browser code: everything under src/.
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: { react, 'react-hooks': reactHooks },
    settings: { react: { version: 'detect' } },
    rules: {
      ...react.configs.flat.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      // The one that would have caught the `t` shadowing in VideoPlayer, where
      // a caption track and a seek handler both bound `t` inside a component
      // whose translate function is also called `t`.
      'no-shadow': 'warn',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },

  // The design mockups under public/design: plain browser scripts, no modules,
  // no React. Vite copies public/ verbatim, so they are served at /design/ -
  // see their README - and they are linted like anything else.
  {
    files: ['public/design/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: globals.browser,
    },
    rules: {
      'no-unused-vars': ['error', { caughtErrors: 'none' }],
      'no-empty': ['error', { allowEmptyCatch: true }],
    },
  },

  // Build and content scripts, plus the palette and the Tailwind/Vite config:
  // Node, not a browser, and they are allowed to use `process`.
  {
    files: ['scripts/**/*.mjs', '*.config.js', 'palette.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: globals.node,
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },
]
