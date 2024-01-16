const Errors = require("../errors/patient-error.js");

const Warnings = {
    List: {
        UnsupportedKeys: {
            code: `${Errors.List.UC_CODE}unsupportedKeys`,
        },
    },
    Get: {
        UnsupportedKeys: {
            code: `${Errors.Get.UC_CODE}unsupportedKeys`,
        },
    },
    Create: {
        UnsupportedKeys: {
            code: `${Errors.Create.UC_CODE}unsupportedKeys`,
        }
    },
};

module.exports = Warnings;