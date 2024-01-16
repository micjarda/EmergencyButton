"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/patient-error");
const Warnings = require("../../api/warnings/patient-warning");
const { Profiles, Schemas, Patients } = require("../constants");

class GetAbl {
    constructor() {
        this.validator = Validator.load();
        this.dao = DaoFactory.getDao(Schemas.PATIENT);
    }

    async get(awid, dtoIn, authorizationResult) {
        let uuAppErrorMap = {};

        // hds 1, 1.1
        const validationResult = this.validator.validate("patientGetDtoInType", dtoIn);
        // 1.2, 1.2.1, 1.3, 1.3.1
        uuAppErrorMap = ValidationHelper.processValidationResult(
            dtoIn,
            validationResult,
            uuAppErrorMap,
            Warnings.Get.UnsupportedKeys.code,
            Errors.Get.InvalidDtoIn
        );


        // hds 3
        const patient = await this.dao.get(awid, dtoIn.id);
        if (!patient) {
            // 3.1
            throw new Errors.Get.PatientDoesNotExist(uuAppErrorMap, { patientId: dtoIn.id });
        }

        // hds 4
        const dtoOut = {
            ...patient,
            uuAppErrorMap,
        };

        return dtoOut;
    }
}

module.exports = new GetAbl();