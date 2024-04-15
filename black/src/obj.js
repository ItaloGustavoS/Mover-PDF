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
 * @param obj - The object to check.
 * @param key - The key to look for.
 * @return True if the key exists in the object, false otherwise.
 */
function hasProperty(obj: object, key: string): boolean {
  return obj.hasOwnProperty(key);
}

/**
 * Checks if an object has any own properties.
 *
 * @param obj - The object to check.
 * @return True if the object has any own properties, false otherwise.
 */
function isEmpty(obj: object): boolean {
  for (const key in obj) {
    if (hasProperty(obj, key)) {
      return false;
    }
  }

  return true;
}

/**
 * Returns the number of own enumerable properties in the object.
 *
 * @param obj - The object to count the properties of.
 * @return The number of own enumerable properties in the object.
 */
function propertyCount(obj: object): number {
  return Object.keys(obj).length;
}

/**
 * Returns a list of all own enumerable properties in an object.
 *
 * @param obj - The object to get the properties from.
 * @return A list of all own enumerable properties in the object.
 */
function keys(obj: object): string[] {
  return Object.keys(obj);
}

/**
 * Returns a list of all own properties in an Object, enumerable
 * or not.
 *
 * @param obj - The object to get the properties from.
 * @return A list of all own properties in the object, enumerable
 *         or not.
 */
function ownProperties(obj: object): string[] {
  return Object.getOwnPropertyNames(obj);
}

/**
 * Returns a list of the values for all own enumerable
 * properties of an object.
 *
 * @param obj - The object to get the property values from.
 * @return A list of the values for all own enumerable
 *         properties of the object.
 */
function getPropertyValues(obj: object): any[] {
  return keys(obj).map(key => obj[key]);
}

/**
 * Returns a list of tuples (key, value) for all own enumerable
 * properties of an object.
 *
 * @param obj - The object to get the property items from.
 * @return A list of tuples (key, value) for all own enumerable
 *         properties of the object.
 */
function propertyItems(obj: object): [string, any][] {
  return keys(obj).map(key => [key, obj[key]]);
}

/**
 * Returns the given property in the object, or default if the
 * property can't be found.
 *
 * @param obj - The object to get the property from.
 * @param key - The key of the property to get.
 * @param defaultValue - The default value to return if the property
 *                       can't be found.
 * @param pred - An optional predicate function to test the
 *              property value before returning it.
 * @return The property value if it exists and passes the predicate test,
 *         or the default value otherwise.
 */
function getProperty<T>(
  obj: object,
  key: string,
  defaultValue: T,
  pred?: (value: any, key: string, obj: object) => boolean
): T {
  if (pred) {
    return pred(obj[key], key, obj) ? obj[key] : defaultValue;
  } else {
    return key in obj ? obj[key] : defaultValue;
  }
}

/**
 * Removes the property from the object, then return it or the
 * default value.
 *
 * @param obj - The object to remove the property from.
 * @param key - The key of the property to remove.
 * @param defaultValue - The default value to return if the property
 *                       can't be found.
 * @param pred - An optional predicate function to test the
 *              property value before removing it.
 * @return The removed property value if it exists and passes the predicate test,
 *         or the default value otherwise.
 */
function removeProperty<T>(
  obj: object,
  key: string,
  defaultValue: T,
  pred?: (value: any, key: string, obj: object) => boolean
): T {
  const value = getProperty(obj, key, undefined, pred);

  if (value !== undefined) {
    delete obj[key];
  }

  return value || defaultValue;
}
