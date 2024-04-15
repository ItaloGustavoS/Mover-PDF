/**
 * Numeric utilities.
 *
 * Copyright (c) 2011 Quildreen Motta // Licensed under MIT/X11
 *
 * Version: 1.0.0
 * Name: black-num
 * Doc: http://black-num.example.com
 * Dependencies: none
 * Tests: http://black-num.example.com/tests
 * Main: black-num.js
 *
 */

const numericUtils = {

  version: '1.0.0',
  name: 'black-num',
  doc: 'http://black-num.example.com',
  dependencies: [],
  tests: 'http://black-num.example.com/tests',
  main: 'black-num.js',

  ///// Function clamp ///////////////////////////////////////////////////////
  //
  //   (num:Num, min:Num = 0, max:Num = Number.MAX_SAFE_INTEGER) ↦ Num
  //
  // Returns the nearest number within the given boundaries.
  //
  clamp(num, min = 0, max = Number.MAX_SAFE_INTEGER) {
    if (typeof num !== 'number') {
      throw new Error('Invalid argument: num must be a number');
    }
    if (typeof min !== 'number') {
      throw new Error('Invalid argument: min must be a number');
    }
    if (typeof max !== 'number') {
      throw new Error('Invalid argument: max must be a number');
    }
    return num < min ? min : num > max ? max : num;
  },

  ///// Function wrap ////////////////////////////////////////////////////////
  //
  //   (num:Num, min:Num = 0, max:Num = Number.MAX_SAFE_INTEGER) ↦ Num
  //
  // Keeps a number within the given boundaries, but if the given
  // number exceeds it, it wraps around.
  //
  wrap(num, min = 0, max = Number.MAX_SAFE_INTEGER) {
    if (typeof num !== 'number') {
      throw new Error('Invalid argument: num must be a number');
    }
    if (typeof min !== 'number') {
      throw new Error('Invalid argument: min must be a number');
    }
    if (typeof max !== 'number') {
      throw new Error('Invalid argument: max must be a number');
    }
    return num - Math.floor((num - min) / (max - min)) * (max - min);
  },

  ///// Function snap ////////////////////////////////////////////////////////
  //
  //   (num:Num, step:Num = 1) ↦ Num
  //
  // Snaps the number to the nearest number in the arithmetic
  // progression with the given step size.
  //
  snap(num, step = 1) {
    if (typeof num !== 'number') {
      throw new Error('Invalid argument: num must be a number');
    }
    if (typeof step !== 'number') {
      throw new Error('Invalid argument: step must be a number');
    }
    return Math.round(num / step) * step;
  },

  ///// Function pad /////////////////////////////////////////////////////////
  //
  //   (num:Num, size:Num = 1) ↦ Str
  //
  // Prefixes
