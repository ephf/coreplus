class SupermanError extends Error {}
function throwError(text) {
  console.error(new SupermanError(text));
  if (typeof window == "undefined") process.exit();
}

/**
 * **Superman**
 * ```js
 * class Item extends Superman {
 *  constructor(...) {
 *   super(...);
 *  }
 * }
 * ```
 */
class Superman {
  /**
   * **Superman**
   * ```js
   * super(...);
   * ```
   * @param  {...any} args `super(` ***`...`*** `);`
   * - Arguments: everything you want to add to the object.
   */
  constructor(...args) {
    /super *\( *(.+?)\)/
      .exec(this.constructor.toString())[1]
      .split(/, */)
      .forEach((arg, i) => {
        this[arg] = args[i];
      });
  }
}

/**
 * **superman**
 * ```js
 * class Item {
 *  constructor(...) {
 *   superman(Class, ...);
 *  }
 * }
 * ```
 * @param {*} Class `superman(` ***`Class`*** `, ...);`
 * - Argument: `this` keyword.
 * @param  {...any} args `superman(Class,` ***`...`*** `);`
 * - Arguments: everything you want to add to the object.
 */
function superman(Class, ...args) {
  if (!Class.constructor) {
    throwError("missing class for superman");
  }
  /superman *\(.+?, *(.+?)\)/
    .exec(Class.constructor.toString())[1]
    .split(/, */)
    .forEach((arg, i) => {
      Class[arg] = args[i];
    });
}

module.exports = { Superman, superman, SupermanError };
