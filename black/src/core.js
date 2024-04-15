'use strict';

const top = (typeof window !== 'undefined' ? window : global);

function genericp(kind) {
  return kind.includes('generic');
}

function ownp(kind) {
  return kind.includes('own');
}

function utilsp(kind) {
  return kind.includes('utils');
}

function specialp(kind, key) {
  return /^\$/.test(key);
}

function fnp(module, obj) {
  return typeof obj === 'function';
}

function unpack(kind, module, target, proto, source) {
  if (ownp(kind)) do_unpack(proto, source, methodize);
  if (genericp(kind)) do_unpack(target, source);
  if (utilsp(kind)) do_unpack(module, source.$black_utils);
}

function do_unpack(target, source, mapper = x => x) {
  if (!source || !target) return;

  for (const value of Object.values(source)) {
    if (!specialp(kind, key)) {
      target[key] = value && mapper(value);
    }
  }

  return target;
}

function unpack_all(kind, global, util) {
  for (const [module, value] of Object.entries(this)) {
    if (!fnp(module, value)) unpack(kind, module, value.$black_box, value.$black_proto, value, util);
  }
}

function methodize(fn) {
  return function(...args) {
    return fn.apply(this, [this, ...args]);
  };
}

if (typeof exports === 'undefined') {
  const __old = top.black;
  top.black = {};

  top.black.make_local = function() {
    top.black = __old;
    return top.black;
  };

  top.black.unpack = unpack;
  top.black.unpack_all = unpack_all;
} else {
  top.black = exports;
}
