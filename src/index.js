class CorePlusError extends Error {}
function throwError(text) {
  console.error(new CorePlusError(text));
  if (typeof window == "undefined") process.exit(-1);
}

const { SmallInt, SmallIntError } = require("./smallInt/index");
const { StrongType, StrongTypeError } = require("./strongType/index");
const { Superman, SupermanError, superman } = require("./superman/index");
const { classes } = require("./classes/index");

/**
 * @param {'dotEquals' | 'smallInt' | 'strongType' | 'superman' | 'classes' | 'all'} get
 * @returns {{
 *  SmallInt: SmallInt;
 *  SmallIntError: : SmallIntError;
 *  StrongType: StrongType;
 *  StrongTypeError: StrongTypeError;
 *  Superman: Superman;
 *  SupermanError: SupermanError;
 *  superman: superman;
 *  classes: classes;
 * }}
 */
module.exports = (get) => {
  switch (get.toLowerCase()) {
    case "all":
      require("./dotEquals/index");
      return {
        SmallInt,
        SmallIntError,
        StrongType,
        StrongTypeError,
        Superman,
        SupermanError,
        superman,
        classes,
      };
    case "dotequals":
      require("./dotEquals/index");
      return {};
    case "smallint":
      return { SmallInt, SmallIntError };
    case "strongtype":
      return { StrongType, StrongTypeError };
    case "superman":
      return { Superman, SupermanError, superman };
    case "classes":
      return { classes };
    default:
      throwError(`CorePlus doesn't have module '${get}'`);
  }
};
