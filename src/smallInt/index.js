class SmallIntError extends Error {}
function throwError(text) {
  console.error(new SmallIntError(text));
  if (typeof window == "undefined") process.exit(-1);
}

/**
 * **SmallInt**
 * ```js
 * const decimal = new SmallInt(int);
 * ```
 */
class SmallInt {
  /** @private */ int;
  /** @private */ div = 1;
  /**
   * **SmallInt**
   * ```js
   * SmallInt(int);
   * ```
   * @param {Number} int `SmallInt(` ***`int`*** `);`
   * - Argument: The SmallInt number
   */
  constructor(int) {
    if (int === undefined) {
      throwError("Missing number for SmallInt");
    }
    if (typeof int != "number") {
      throwError("Wrong type for SmallInt");
    }
    if (Math.floor(int) != int) {
      const dec = int.toString().split(".")[1].length;
      this.div = 10 ** dec;
      int *= this.div;
    }
    this.int = int;
  }

  /** @private */ valueOf() {
    return this.int / this.div;
  }

  /** @private */ toString() {
    return this.int / this.div + "";
  }

  /** @private */ typeCheck(int) {
    if (int === undefined) {
      throwError("Missing number for SmallInt");
    }
    if (typeof int == "number") {
      int = new SmallInt(int);
    } else if (!(int instanceof SmallInt)) {
      throwError("Wrong type for SmallInt");
    }
    return int;
  }

  /** @private */ equalize(int) {
    let change = false;
    let divInc = 1;
    while (this.div > int.div) {
      divInc *= 10;
      int.int *= 10;
      int.div *= 10;
    }
    while (this.div < int.div) {
      change = true;
      divInc *= 10;
      this.int *= 10;
      this.div *= 10;
    }
    return [change, divInc];
  }

  /**
   * Operation: `+=`
   * @param {Number | SmallInt} int
   */
  add(int) {
    int = this.typeCheck(int);
    const [change, divInc] = this.equalize(int);
    this.int += int.int;
    if (change) this.div /= divInc;
    else int.div /= divInc;
  }

  /**
   * Operation: `+`
   * @param {Number | SmallInt} int
   * @returns {SmallInt}
   */
  plus(int) {
    int = this.typeCheck(int);
    const [change, divInc] = this.equalize(int);
    const value = new SmallInt((this.int + int.int) / this.div);
    if (change) this.div /= divInc;
    else int.div /= divInc;
    return value;
  }

  /**
   * Operation: `-=`
   * @param {Number | SmallInt} int
   */
  subtract(int) {
    int = this.typeCheck(int);
    const [change, divInc] = this.equalize(int);
    this.int -= int.int;
    if (change) this.div /= divInc;
    else int.div /= divInc;
  }

  /**
   * Operation: `-`
   * @param {Number | SmallInt} int
   * @returns {SmallInt}
   */
  minus(int) {
    int = this.typeCheck(int);
    const [change, divInc] = this.equalize(int);
    const value = new SmallInt((this.int - int.int) / this.div);
    if (change) this.div /= divInc;
    else int.div /= divInc;
    return value;
  }

  /**
   * Operation: `*=`
   * @param {Number | SmallInt} int
   */
  multiply(int) {
    int = this.typeCheck(int);
    this.int *= int.int;
    this.div *= int.div;
  }

  /**
   * Operation: `*`
   * @param {Number | SmallInt} int
   * @returns {SmallInt}
   */
  times(int) {
    int = this.typeCheck(int);
    return new SmallInt((this.int * int.int) / (this.div * int.div));
  }

  /**
   * Operation: `/=`
   * @param {Number | SmallInt} int
   */
  divide(int) {
    int = this.typeCheck(int);
    this.int /= int.int;
    this.div /= int.div;
    const si = new SmallInt(+this);
    this.int = si.int;
    this.div = si.div;
  }

  /**
   * Operation: `/`
   * @param {Number | SmallInt} int
   * @returns {SmallInt}
   */
  over(int) {
    int = this.typeCheck(int);
    return new SmallInt(this.int / int.int / (this.div / int.div));
  }

  /**
   * Operation: `%=`
   * @param {Number | SmallInt} int
   */
  remainder(int) {
    int = this.typeCheck(int);
    const [change, divInc] = this.equalize(int);
    this.int %= int.int;
    const si = new SmallInt(+this);
    if (change) this.div /= divInc;
    else int.div /= divInc;
    this.int = si.int;
    this.div = si.div;
  }

  /**
   * Operation: `%`
   * @param {Number | SmallInt} int
   * @returns {SmallInt}
   */
  modulus(int) {
    int = this.typeCheck(int);
    const [change, divInc] = this.equalize(int);
    const value = new SmallInt((this.int % int.int) / this.div);
    if (change) this.div /= divInc;
    else int.div /= divInc;
    return value;
  }
}

module.exports = { SmallInt, SmallIntError };
