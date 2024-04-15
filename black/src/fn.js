'use strict';

/******************************************************************************
 * Function utilities.
 *     _________________________________________________________________      *
 *        Copyright (c) 2011 Quildreen Motta // Licenced under MIT/X11        *
 ******************************************************************************/

function functionUtils(root) {
  var functionUtil = {};

  var slice = Array.prototype.slice;

  ///// Function partial /////////////////////////////////////////////////////
  //
  // Returns a function that will always have the given arguments
  // prepended to the argument list passed to the function.
  //
  function partial(fn) {
    var args = slice.call(arguments, 1);
    return function () {
      return fn.apply(this, args.concat(slice.call(arguments)));
    };
  }

  ///// Function delay ///////////////////////////////////////////////////////
  //
  // Calls the function after the given number of seconds.
  //
  // Returns an ID to a timer, such that the call to the function can
  // be cancelled by passing that ID to `clearTimeout`.
  //
  function delay(fn, seconds) {
    var args = slice.call(arguments, 2);
    if (args.length) fn = fn.bind.apply(fn, args);

    return setTimeout(fn, seconds * 1000);
  }

  ///// Function defer ///////////////////////////////////////////////////////
  //
  // Same as `delay`, but calls the function as soon as the engine is
  // not busy doing other things.
  //
  function defer(fn) {
    var args = slice.call(arguments, 1);
    return delay.apply(this, [fn, 0].concat(args));
  }

  ///// Function wrap ////////////////////////////////////////////////////////
  //
  // Returns a function that passes the given `wrapper` as the first
  // argument for `fn`.
  //
  function wrap(fn, wrapper) {
    if (!wrapper)
      wrapper = function (f) {
        f.apply(this, slice.call(arguments, 1));
      };

    return partial(wrapper, fn);
  }

  ///// Exports //////////////////////////////////////////////////////////////
  functionUtil =
    typeof exports === 'undefined'
      ? (root.functionUtils = {})
      : exports;

  functionUtil.partial = partial;
  functionUtil.delay = delay;
  functionUtil.defer = defer;
  functionUtil.wrap = wrap;
}

// Demonstrate the usage of the functions
functionUtils(this);

var sum = function (a, b) {
  return a + b;
};

var addOne = function (x) {
  return x + 1;
};

var addOneDelayed = functionUtils.delay(addOne, 1000);
console.log(addOneDelayed(5)); // Logs 6 after 1 second

var addFive = functionUtils.wrap(sum, function (f) {
  return function (a, b) {
    return f(a + 5, b + 5);
  };
});
console.log(addFive(2, 3)); // Logs 12
