'use strict';

/******************************************************************************
 *                                ~black.core~                                *
 *                              ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾                              *
 * Provides common functionality to all black modules.                        *
 *     _________________________________________________________________      *
 *        Copyright (c) 2011 Quildreen Motta // Licenced under MIT/X11        *
 ******************************************************************************/

const slice = Array.prototype.slice;
const keys = Object.keys;
const top = (typeof window !== 'undefined' ? window : global);

// Arbitrary checks
function genericp(kind) {
  return kind.includes('generic');
}

function ownp(kind) {
  return kind.includes('own');
}

function utilsp(kind) {
  return kind.includes('utils');
}

function specialp(key) {
  return /^\$/.test(key);
}

function fnp(obj) {
  return typeof obj === 'function';
}

// Unpacks a black module so it's used in a sane way
function unpack(kind, root, target, proto, source) {
  if (ownp(kind)) do_unpack(proto, source, methodize);
  if (genericp(kind)) do_unpack(target, source);
  if (utilsp(kind)) do_unpack(root, source.$black_utils);
}

function do_unpack(target, source, mapper) {
  if (!source || !target) return;

  mapper = mapper || function(x) {
    return x;
  };

  for (const key of Object.keys(source)) {
    if (!specialp(key)) {
      target[key] = source[key] && mapper(source[key]);
    }
  }

  return target;
}

// Unpacks all modules in black. Utils go in `target` or the global obj
function unpack_all(kind, global) {
  for (const module of Object.keys(this)) {
    const m = this[module];
    if (!fnp(m)) unpack(kind, global || top, m.$black_box, m.$black_proto, m);
  }
}

// Transforms a generic method into a SLOOOOOOOOOOOW instance method.
function methodize(fn) {
  return function(...args) {
    return fn.apply(this, [this, ...args]);
  };
}

///// Exports //////////////////////////////////////////////////////////////
if (typeof exports === 'undefined') {
  const __old = root.black;
  const black = root.black = {};

  ///// Method black.make_local //////////////////////////////////////////
  black.make_local = function() {
    root.black = __old;
    return black;
  };
} else {
  const black = exports;
}

///// -Properties under black //////////////////////////////////////////////
black.unpack = unpack;
black.unpack_all = unpack_all;

return undefined;
