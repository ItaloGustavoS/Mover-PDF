/******************************************************************************
 *                                   ~type~                                   *
 *                                 ‾‾‾‾‾‾‾‾‾‾                                 *
 * Type and functionality testing.                                            *
 *     _________________________________________________________________      *
 *        Copyright (c) 2011 Quildreen Motta // Licenced under MIT/X11        *
 ******************************************************************************/

/// Module type ////////////////////////////////////////////////////////////////
type Module = {
  class_of: (obj: any) => string;
  nilp: (obj: any) => boolean;
  not_nilp: (obj: any) => boolean;
  undefp: (obj: any) => boolean;
  strp: (obj: any) => boolean;
  nump: (obj: any) => boolean;
  regexpp: (obj: any) => boolean;
  fnp: (obj: any) => boolean;
  boolp: (obj: any) => boolean;
  objp: (obj: any) => boolean;
  listp: (obj: any) => boolean;
  callablep: (obj: any) => boolean;
  numericp: (obj: any) => boolean;
  sequencep: (obj: any) => boolean;
  sliceablep: (obj: any) => boolean;
  searchablep: (obj: any) => boolean;
  testablep: (obj: any) => boolean;
  $black_box: any;
  $black_utils: {
    class_of: (obj: any) => string;
    nilp: (obj: any) => boolean;
    not_nilp: (obj: any) => boolean;
    undefp: (obj: any) => boolean;
    strp: (obj: any) => boolean;
    nump: (obj: any) => boolean;
    regexpp: (obj: any) => boolean;
    fnp: (obj: any) => boolean;
    boolp: (obj: any) => boolean;
    objp: (obj: any) => boolean;
    listp: (obj: any) => boolean;
    callablep: (obj: any) => boolean;
    numericp: (obj: any) => boolean;
    sliceablep: (obj: any) => boolean;
    searchablep: (obj: any) => boolean;
    testablep: (obj: any) => boolean;
  };
};

function class_of(obj: any): string {
  return Object.prototype.toString.call(obj).slice(8, -1);
}

function nilp(obj: any): boolean {
  return obj == null;
}

function not_nilp(obj: any): boolean {
  return obj != null;
}

function undefp(obj: any): boolean {
  return obj === void 0;
}

function strp(obj: any): boolean {
  return class_of(obj) === "String";
}

function nump(obj: any): boolean {
  return class_of(obj) === "Number";
}

function regexpp(obj: any): boolean {
  return class_of(obj) === "RegExp";
}

function fnp(obj: any): boolean {
  return class_of(obj) === "Function";
}

function boolp(obj: any): boolean {
  return class_of(obj) === "Boolean";
}

function objp(obj: any): boolean {
  return obj === Object(obj);
}

function listp(obj: any): boolean {
  return obj instanceof Array;
}

function callablep(obj: any): boolean {
  return typeof obj === "function";
}

function numericp(obj: any): boolean {
  return !isNaN(obj);
}

function sequencep(obj: any): boolean {
  return not_nilp(obj) && typeof obj.length === "number";
}

function sliceablep(obj: any): boolean {
  return not_nilp(obj) && typeof obj.slice === "function";
}

function searchablep(obj: any): boolean {
  return (
    not_nilp(obj) &&
    typeof obj.indexOf === "function" &&
    typeof obj.lastIndexOf === "function"
  );
}

function testablep(obj: any): boolean {
  return not_nilp(obj) && typeof obj.test === "function";
}

/// Exports //////////////////////////////////////////////////////////////
const root =
  typeof globalThis !== "undefined"
    ? globalThis
    : typeof self !== "undefined"
    ? self
    : typeof window !== "undefined"
    ? window
    : {};

let type: Module;
if (typeof exports === "undefined") {
  type = root.black.type;
} else {
  type = exports;
}

type.class_of = class_of;
type.nilp = nilp;
type.not_nilp = not_nilp;
type.undefp = undefp;
type.strp = strp;
type.nump = nump;
type.regexpp = regexpp;
type.fnp = fnp;
type.boolp = boolp;
type.objp = objp;
type.listp = listp;
type.callablep = callablep;
type.numericp = numericp;
type.sequencep = sequencep;
type.sliceablep = sliceablep;
type
