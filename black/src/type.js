/******************************************************************************
 *                                   TypeCheck                                 *
 *                                 ‾‾‾‾‾‾‾‾‾‾                                 *
 * Type and functionality testing.                                            *
 *     _________________________________________________________________      *
 *        Copyright (c) 2011 Quildreen Motta // Licenced under MIT/X11        *
 ******************************************************************************/

/// Type Checking Functions ////////////////////////////////////////////////////

const classOf = (obj: any): string =>
  Object.prototype.toString.call(obj).slice(8, -1);

const isNil = (obj: any): boolean => obj == null;
const isNotNil = (obj: any): boolean => obj != null;
const isUndef = (obj: any): boolean => obj === void 0;
const isStr = (obj: any): boolean => classOf(obj) === "String";
const isNum = (obj: any): boolean => classOf(obj) === "Number";
const isRegExp = (obj: any): boolean => classOf(obj) === "RegExp";
const isFn = (obj: any): boolean => classOf(obj) === "Function";
const isBool = (obj: any): boolean => classOf(obj) === "Boolean";
const isObj = (obj: any): boolean => obj === Object(obj);
const isList = (obj: any): boolean => obj instanceof Array;
const isCallable = (obj: any): boolean => typeof obj === "function";
const isNumeric = (obj: any): boolean => !isNaN(obj);
const isSequence = (obj: any): boolean =>
  isNotNil(obj) && typeof obj.length === "number";
const isSliceable = (obj: any): boolean =>
  isNotNil(obj) && typeof obj.slice === "function";
const isSearchable = (obj: any): boolean =>
  isNotNil(obj) &&
  typeof obj.indexOf === "function" &&
  typeof obj.lastIndexOf === "function";
const isTestable = (obj: any): boolean =>
  isNotNil(obj) && typeof obj.test === "function";

/// TypeCheck Module ///////////////////////////////////////////////////////////

type TypeCheck = {
  classOf: typeof classOf;
  isNil: typeof isNil;
  isNotNil: typeof isNotNil;
  isUndef: typeof isUndef;
  isStr: typeof isStr;
  isNum: typeof isNum;
  isRegExp: typeof isRegExp;
  isFn: typeof isFn;
  isBool: typeof isBool;
  isObj: typeof isObj;
  isList: typeof isList;
  isCallable: typeof isCallable;
  isNumeric: typeof isNumeric;
  isSequence: typeof isSequence;
  isSliceable: typeof isSliceable;
  isSearchable: typeof isSearchable;
  isTestable: typeof isTestable;
};

const typeCheck: TypeCheck = {
  classOf,
  isNil,
  isNotNil,
  isUndef,
  isStr,
  isNum,
  isRegExp,
  isFn,
  isBool,
  isObj,
  isList,
  isCallable,
  isNumeric,
  isSequence,
  isSliceable,
  isSearchable,
  isTestable,
};

/// Exports //////////////////////////////////////////////////////////////
const root =
  typeof globalThis !== "undefined"
    ? globalThis
    : typeof self !== "undefined"
    ? self
    : typeof window !== "undefined"
    ? window
    : {};

let typeCheckModule: TypeCheck;
if (typeof exports === "undefined") {
  typeCheckModule = root.typeCheck = typeCheck;
} else {
  typeCheckModule = exports;
}
