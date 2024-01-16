const Errors = require("../errors/call-error.js");

const Warnings = {
  List: {
    UnsupportedKeys: {
      code: `${Errors.List.UC_CODE}unsupportedKeys`,
    },
  },
  Update: {
    UnsupportedKeys: {
      code: `${Errors.Update.UC_CODE}unsupportedKeys`,
    },
    CategoryDoesNotExist: {
      code: `${Errors.Update.UC_CODE}categoryDoesNotExist`,
      message: "One or more categories with given id do not exist.",
    },
  },
  Create: {
    UnsupportedKeys: {
      code: `${Errors.Create.UC_CODE}unsupportedKeys`,
    }
  },
};

module.exports = Warnings;
