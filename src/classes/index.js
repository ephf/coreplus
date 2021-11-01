/**
 * **classes**
 * ```js
 * classes(...classes);
 * ```
 * @param {...any} classes `classes(` ***`...classes`*** `);`
 * - Arguments: The classes you want to combine
 * @returns {CombinedClass}
 */
function classes(...classes) {
  class CombinedClass {
    constructor() {
      const This = this;
      classes.forEach((Class) => {
        const obj = new Class(...arguments);
        Object.keys(obj).forEach((key) => {
          This[key] = obj[key];
        });
        Object.getOwnPropertyNames(Class.prototype).forEach((key) => {
          if (key != "constructor") {
            This[key] = obj[key];
          }
        });
      });
    }
  }
  return CombinedClass;
}

module.exports = { classes };
