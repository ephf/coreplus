class ObjectEqualError extends Error {}
function throwError(text) {
  console.error(new ObjectEqualError(text));
  if (typeof window == "undefined") process.exit(-1);
}

/**
 * **ObjectEquals**
 * ```js
 * Array.equals(arr1, arr2);
 * ```
 * @param {Array} arr1 `equals(` ***`arr1`*** `, arr2);`
 * - Argument: first array to compare
 * @param {Array} arr2 `equals(arr1,` ***`arr2`*** `);`
 * - Argument: second array to compare
 * @returns {Boolean}
 */
Array.equals = (arr1, arr2) => {
  if (!(arr1 instanceof Array) || !(arr2 instanceof Array)) {
    throwError("Array.equals parameter is not an array");
  }
  if (arr1.length != arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] != arr2[i]) return false;
  }
  return true;
};

/**
 * **ObjectEquals**
 * ```js
 * Object.equals(abj1, obj2);
 * ```
 * @param {Array} obj1 `equals(` ***`obj1`*** `, obj2);`
 * - Argument: first object to compare
 * @param {Array} obj2 `equals(obj1,` ***`obj2`*** `);`
 * - Argument: second object to compare
 * @returns {Boolean}
 */
Object.equals = (obj1, obj2) => {
  if (!(obj1 instanceof Object) || !(obj2 instanceof Object)) {
    throwError("Object.equals parameter is not an object");
  }
  function rec(obj1, obj2, keys) {
    if (!Array.equals(Object.keys(obj1), Object.keys(obj2))) {
      return true;
    }
    for (const key of keys) {
      if (typeof obj2[key] == "object") {
        if (typeof obj1[key] == "object") {
          if (rec(obj1[key], obj2[key], Object.keys(obj2[key]))) {
            return true;
          }
        }
        return true;
      }
      if (obj1[key] != obj2[key]) {
        console.log(obj1, obj2[key], key);
        return true;
      }
    }
  }
  return !rec(obj1, obj2, Object.keys(obj2));
};

module.exports = { ObjectEqualError };
