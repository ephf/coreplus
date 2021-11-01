class StrongTypeError extends Error {}
function throwError(text) {
  console.error(new StrongTypeError(text));
  if (typeof window == "undefined") process.exit(-1);
}

/**
 * **StrongType**
 * ```js
 * const typeVariable = new StrongType(value?*, Type?*, allowUndefined?);
 * ```
 */
class StrongType {
  /** @private */ value;
  /**
   * **StrongType**
   * ```js
   * StrongType(value?*, Type?*, allowUndefined?);
   * ```
   * @param {*} value `StrongType(` ***`value?*`*** `, Type?*, allowUndefined?);`
   * - Argument: The value of the variable, not required if there is a Type.
   * @param {*} Type `StrongType(value?*,` ***`Type?*`*** `, allowUndefined?);`
   * - Argument: The type of the variable, defaults to the type of the value if not defined.
   * @param {Boolean?} allowUndefined `StrongType(value?*, Type?*,` ***`allowUndefined?`*** `);`
   * - Argument: If the variable can be set to undefined, this argument is optional.
   */
  constructor(value, Type, allowUndefined) {
    this.allowUndefined = allowUndefined ?? true;
    if (value === undefined && !Type) {
      throwError("missing value and type in StrongType");
    }
    if (!Type) {
      if (typeof value == "object") {
        Type = value.constructor;
      } else {
        Type = typeof value;
      }
    } else {
      if (Type instanceof Array) {
        Type.forEach((type, i) => {
          Type[i] = this.typeToString(type);
        });
      } else {
        Type = this.typeToString(Type);
      }
    }
    if (!this.testType(value, Type)) {
      throwError("value doesn't match type in StrongType");
    }
    this.value = value;
    this.Type = Type;
  }

  /** @private */ testType(value, Type) {
    if (value === undefined && this.allowUndefined) {
      return true;
    }
    if (Type instanceof Array) {
      for (const type of Type) {
        if (typeof type == "string") {
          if (typeof value == type) {
            return true;
          }
        } else {
          if (value instanceof type) {
            return true;
          }
        }
      }
      return false;
    }
    if (typeof Type == "string") {
      return typeof value == Type;
    }
    return value instanceof Type;
  }

  /** @private */ typeToString(Type) {
    if (Type == Number) {
      return "number";
    } else if (Type == String) {
      return "string";
    } else if (Type == Boolean) {
      return "boolean";
    } else if (Type == BigInt) {
      return "bigint";
    } else if (Type == Function) {
      return "function";
    } else if (Type == Symbol) {
      return "symbol";
    } else {
      return Type;
    }
  }

  /**
   * StrongType variable's value
   */
  get v() {
    return this.value;
  }

  /**
   * StrongType variable's value
   * @param {*} val
   */
  set v(val) {
    if (!this.testType(val, this.Type)) {
      throwError("value doesn't match type in StrongType");
    } else {
      return (this.value = val);
    }
  }
}

if (typeof globalThis == "undefined") {
  window.globalThis = window;
}

/**
 * *StrongType*
 * ```js
 * defineStrongType(name, value?*, Type?*, allowUndefined?);
 * ```
 * @param {String} name `defineStrongType(` ***`name`*** `, value?*, Type?*, allowUndefined?);`
 * - Argument: The name of the StrongType variable
 * @param {*} value `defineStrongType(name,` ***`value?*`*** `, Type?*, allowUndefined?);`
 * - Argument: The value of the variable, not required if there is a Type.
 * @param {*} Type `defineStrongType(name, value?*,` ***`Type?*`*** `, allowUndefined?);`
 * - Argument: The type of the variable, defaults to the type of the value if not defined.
 * @param {Boolean?} allowUndefined `defineStrongType(name, value?*, Type?*,` ***`allowUndefined?`*** `);`
 * - Argument: If the variable can be set to undefined, this argument is optional.
 */
function defineStrongType(name, value, Type, allowUndefined) {
  const st = new StrongType(value, Type, allowUndefined);
  globalThis.__defineGetter__(name, () => {
    return st.v;
  });
  globalThis.__defineSetter__(name, (val) => {
    return (st.v = val);
  });
}

module.exports = { StrongType, StrongTypeError, defineStrongType };
