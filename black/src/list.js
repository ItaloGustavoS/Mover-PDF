#!/usr/bin/env node

/**
 * list.js - Utilities for handling sequence objects (Array and Array-like)
 *
 * Copyright (c) 2011 Quildreen Motta
 * Licenced under MIT/X11
 */

/// Module list ////////////////////////////////////////////////////////////////
(function (root) {

    var list, undefined, type;

    // Imports
    type = typeof require == 'function' ? require('./type') : root.type;

    // Aliases
    var arrayp = Array.isArray,
        __slice = Array.prototype.slice,
        __index = Array.prototype.indexOf,
        __filter = Array.prototype.filter,
        __map = Array.prototype.map,
        __each = Array.prototype.forEach,
        __reduce = Array.prototype.reduce,
        __reduce_right = Array.prototype.reduceRight,
        __some = Array.prototype.some,
        __every = Array.prototype.every,
        __max = Math.max;

    // Typechecking aliases
    var nilp = type.nilp,
        not_nilp = type.not_nilp,
        objp = type.objp,
        sequencep = type.sequencep,
        callablep = type.callablep;

    //// -Making lists /////////////////////////////////////////////////////////

    ///// Function make_array //////////////////////////////////////////////////
    //
    //   (size:Num[, default_value='']) ↦ Array
    //
    // Allocates an array with the given size, optionally filled with the
    // default value.
    //
    function make_array(size, default_value) {
        size = Math.max(size, 0);
        default_value = default_value || '';
        if (size <= 0) return [];

        return Array(size).fill(default_value);
    }

    ///// Function range ///////////////////////////////////////////////////////
    //
    //   (start:Num, end:Num[, step=1]) ↦ Array
    //
    // Makes an array with numeric values ranging from `start` to `end`.
    //
    // `end` is not included in the resulting array.
    //
    function range(start, end, step) {
        step = step || 1;
        if (step === 0) throw new Error('step cannot be zero');

        var result = [];

        for (var i = start; i < end; i += step)
            result.push(i);

        return result;
    }

    ///// Function to_array ////////////////////////////////////////////////////
    //
    //   (obj:Object[, start=0][, end]) ↦ Array
    //
    // Creates an array from an object with numeric keys, optionally
    // specifying a start and end index.
    //
    function to_array(obj, start, end) {
        if (arrayp(obj)) return __slice.call(obj, start, end);
        if (!sequencep(obj)) throw new TypeError('obj must be an array-like object');

        start = start || 0;
        end = end || obj.length;

        return __slice.call(obj, start, end);
    }

    // Export the list module
    root.list = {
        make_array: make_array,
        range: range,
        to_array: to_array
    };

})(this);
