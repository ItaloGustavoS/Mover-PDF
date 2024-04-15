/******************************************************************************
 *                                ~black.obj~                                 *
 *                              ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾                               *
 * Extensions to work with objects.                                           *
 *     _________________________________________________________________      *
 *        Copyright (c) 2011 Quildreen Motta // Licenced under MIT/X11        *
 ******************************************************************************/

/**
 * Checks if the given key exists in the object.
 *
 * @param {Object} obj - The object to check.
 * @param {string} key - The key to look for.
 * @return {boolean} True if the key exists in the object, false otherwise.
 */
function hasProperty(obj, key) {
    return obj.hasOwnProperty(key);
}

/**
 * Checks if an object has any own properties.
 *
 * @param {Object} obj - The object to check.
 * @return {boolean} True if the object has any own properties, false otherwise.
 */
function isEmpty(obj) {
    for (var key in obj) {
        if (hasProperty(obj, key)) {
            return false;
        }
    }

    return true;
}

/**
 * Returns the number of own enumerable properties in the object.
 *
 * @param {Object} obj - The object to count the properties of.
 * @return {number} The number of own enumerable properties in the object.
 */
function propertyCount(obj) {
    return Object.keys(obj).length;
}

/**
 * Returns a list of all own enumerable properties in an object.
 *
 * @param {Object} obj - The object to get the properties from.
 * @return {Array} A list of all own enumerable properties in the object.
 */
function keys(obj) {
    return Object.keys(obj);
}

/**
 * Returns a list of all own properties in an Object, enumerable
 * or not.
 *
 * @param {Object} obj - The object to get the properties from.
 * @return {Array} A list of all own properties in the object, enumerable
 *                 or not.
 */
function own_props(obj) {
    return Object.getOwnPropertyNames(obj);
}

/**
 * Returns a list of the values for all own enumerable
 * properties of an object.
 *
 * @param {Object} obj - The object to get the property values from.
 * @return {Array} A list of the values for all own enumerable
 *                 properties of the object.
 */
function getPropertyValues(obj) {
    return keys(obj).map(function (key) {
        return obj[key];
    });
}

/**
 * Returns a list of tupes (key, value) for all own enumerable
 * properties of an object.
 *
 * @param {Object} obj - The object to get the property items from.
 * @return {Array} A list of tuples (key, value) for all own enumerable
 *                 properties of the object.
 */
function propertyItems(obj) {
    return keys(obj).map(function (key) {
        return [key, obj[key]];
    });
}

/**
 * Returns the given property in the object, or default if the
 * property can't be found.
 *
 * @param {Object} obj - The object to get the property from.
 * @param {string} key - The key of the property to get.
 * @param {*} default_value - The default value to return if the property
 *                            can't be found.
 * @param {function} [pred] - An optional predicate function to test the
 *                            property value before returning it.
 * @return {*} The property value if it exists and passes the predicate test,
 *             or the default value otherwise.
 */
function getProperty(obj, key, default_value, pred) {
    if (pred) {
        return pred(obj[key], key, obj) && obj[key] || default_value;
    } else {
        return key in obj ? obj[key] : default_value;
    }
}

/**
 * Removes the property from the object, then return it or the
 * default value.
 *
 * @param {Object} obj - The object to remove the property from.
 * @param {string} key - The key of the property to remove.
 * @param {*} default_value - The default value to return if the property
 *                            can't be found.
 * @param {function} [pred] - An optional predicate function to test the
 *                            property value before removing it.
 * @return {*} The removed property value if it exists and passes the predicate test,
 *             or the default value otherwise.
 */
function removeProperty(obj, key, default_value
