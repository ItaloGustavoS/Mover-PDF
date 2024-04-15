/******************************************************************************
 *                                   ~str~                                    *
 *                                 ‾‾‾‾‾‾‾‾‾                                  *
 * String utilities                                                           *
 *     _________________________________________________________________      *
 *        Copyright (c) 2011 Quildreen Motta // Licenced under MIT/X11        *
 ******************************************************************************/

function stringUtils(root) {

    var str,
        type = typeof require === 'function' ? require('./type') : root.type,
        charCode = String.prototype.charCodeAt,
        char = String.fromCharCode,
        concat = String.prototype.concat,
        lower = String.prototype.toLowerCase,
        upper = String.prototype.toUpperCase,
        find = String.prototype.indexOf,
        findr = String.prototype.lastIndexOf,
        trim = String.prototype.trim,
        slice = String.prototype.slice,
        match = String.prototype.match,
        replace = String.prototype.replace,
        split = String.prototype.split,
        max = Math.max,
        strp = type.strp;

    // Converts a character to its numeric representation.
    // @param {string} str - The string to get the character code from.
    // @param {number} index - The index of the character in the string.
    // @return {number} The numeric representation of the character.
    function charCode(str, index) {
        return charCode.call(str, index);
    }

    // Converts a numeric representation of a character to an actual
    // string with that character.
    // @param {number} code - The numeric representation of the character.
    // @return {string} The string with the character.
    var toChar = String.fromCharCode;

    // Returns an string by repeating `str` the given number of times.
    // @param {string} str - The string to repeat.
    // @param {number} times - The number of times to repeat the string.
    // @return {string} The repeated string.
    function makeStr(str, times) {
        return !max(times, 0) ? '' : Array(times + 1).join(str);
    }

    // Combines all given strings together.
    // @param {string} strings - The strings to combine.
    // @return {string} The combined string.
    function cat() {
        return concat.apply('', arguments);
    }

    // Converts all characters in the given string to UPPER CASE.
    // @param {string} str - The string to convert to upper case.
    // @return {string} The upper case string.
    function upCase(str) {
        return upper.call(str);
    }

    // Converts all characters in the given string to lower case.
    // @param {string} str - The string to convert to lower case.
    // @return {string} The lower case string.
    function lowCase(str) {
        return lower.call(str);
    }

    // Capitalise the first letter of the given string.
    // @param {string} str - The string to capitalise.
    // @param {boolean} allWords - Whether to capitalise the first letter of all words in the string.
    // @return {string} The capitalised string.
    function capitalise(str, allWords) {
        var re;
        if (allWords) {
            re = /\b(\w)/g;
        } else {
            re = /\b(\w)/;
        }
        return lowCase(str).replace(re, function (match, letter) {
            return upCase(letter);
        });
    }

    // Strips all whitespace from both ends of the string.
    // @param {string} str - The string to trim.
    // @return {string} The trimmed string.
    function trimStr(str) {
        return trim.call(str);
    }

    // Checks if a string starts with a piece of text.
    // @param {string} str - The string to check.
    // @param {string} substr - The substring to check for.
    // @return {boolean} Whether the string starts with the substring.
    function startsWithP(str, substr) {
        return find.call(str, substr) === 0;
    }

    // Checks if a string ends with a piece of text.
    // @param {string} str - The string to check.
    // @param {string} substr - The substring to check for.
    // @return {boolean} Whether the string ends with the substring.
    function endsWithP(str, substr) {
        return slice(str, str.length - substr.length) === substr;
    }

    // Checks if the given string contains the substring.
    // @param {string} str - The string to check.
    // @param {string} substr - The substring to check for.
    // @return {boolean} Whether the string contains the substring.
    function hasP(str, substr) {
        return !!~find.call(str, substr);
    }

    // Counts the number of ocurrences of a substring.
    // @param {string} str - The string to search.
    // @param {string} substr - The substring to count.
    // @param {number
