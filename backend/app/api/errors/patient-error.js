"use strict";

const BackendMainUseCaseError = require("./backend-main-use-case-error");
const PATIENT_ERROR_PREFIX = `${BackendMainUseCaseError.ERROR_PREFIX}patient/`;

const List = {
    UC_CODE: `${PATIENT_ERROR_PREFIX}list/`,
    InvalidDtoIn: class extends BackendMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${List.UC_CODE}invalidDtoIn`;
            this.message = "DtoIn is not valid.";
        }
    },
    PatientsMainDoesNotExist: class extends BackendMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${List.UC_CODE}patientsMainDoesNotExist`;
            this.message = "UuObject patientsMain does not exist.";
        }
    },
    PatientsMainNotInCorrectState: class extends BackendMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${List.UC_CODE}patientsMainNotInCorrectState`;
            this.message = "UuObject patientsMain is not in correct state.";
        }
    },
};

const Get = {
    UC_CODE: `${PATIENT_ERROR_PREFIX}get/`,
    InvalidDtoIn: class extends BackendMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Get.UC_CODE}invalidDtoIn`;
            this.message = "DtoIn is not valid.";
        }
    },
    PatientsMainDoesNotExist: class extends BackendMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Get.UC_CODE}patientsMainDoesNotExist`;
            this.message = "UuObject patientsMain does not exist.";
        }
    },
    PatientsMainNotInCorrectState: class extends BackendMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Get.UC_CODE}patientsMainNotInCorrectState`;
            this.message = "UuObject patientsMain is not in correct state.";
        }
    },
    PatientDoesNotExist: class extends BackendMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Get.UC_CODE}patientDoesNotExist`;
            this.message = "Patient does not exist.";
        }
    },
};

const Create = {
    UC_CODE: `${BackendMainUseCaseError.ERROR_PREFIX}patient/create`,

    invalidDtoIn: class extends BackendMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Create.UC_CODE}/invalidDtoIn}`;
            this.message = `DtoIn is not valid`;
        }
    },

    patientDaoCreateFailed: class extends BackendMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Create.UC_CODE}/patientDaoCreateFailed`;
            this.message = `Create patient by patient create failed.`;
        }
    }
}

module.exports = {
    List,
    Get,
    Create,
};