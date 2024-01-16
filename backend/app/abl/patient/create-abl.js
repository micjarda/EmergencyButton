"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/patient-error");
const Warnings = require("../../api/warnings/patient-warning");
const Patient = require("../../component/patient");
const { Profiles, Schemas, Patients } = require("../constants");


class CreateAbl {
    constructor() {
        this.validator = Validator.load();
        this.dao = DaoFactory.getDao(Schemas.PATIENT);
    }

    async create(awid, dtoIn, session, authorizationResult) {
        let uuAppErrorMap = {};

        // hds 1, 1.1
        const validationResult = this.validator.validate("patientCreateDtoInType", dtoIn);
        // 1.2, 1.2.1, 1.3, 1.3.1
        uuAppErrorMap = ValidationHelper.processValidationResult(
            dtoIn,
            validationResult,
            uuAppErrorMap,
            Warnings.Create.UnsupportedKeys.code,
            Errors.Create.InvalidDtoIn
        );

        const addedValues = {
            averageRating: 0,
            ratingCount: 0,
            visibility: authorizationResult.getAuthorizedProfiles().includes(Profiles.AUTHORITIES),
            uuIdentity: session.getIdentity().getUuIdentity(),
            uuIdentityName: session.getIdentity().getName(),
        };

        const uuObject = {
            ...dtoIn,
            ...addedValues,
        };

        // hds 3, 3.1
        if ("text" in dtoIn && dtoIn.text.trim().length === 0 && !dtoIn.image) {
            throw new Errors.Create.InvalidText({ uuAppErrorMap }, { text: dtoIn.text });
        }

        // hds 4
        if (dtoIn.image) {
            // 4.1, 4.1.1
            const image = await Patient.checkAndGetImageAsStream(dtoIn.image, Errors.Create, uuAppErrorMap);

            try {
                // 4.2
                const binary = await UuBinaryAbl.createBinary(awid, {
                    data: image,
                    filename: dtoIn.image.filename,
                    contentType: dtoIn.image.contentType,
                });
                uuObject.image = binary.code;
            } catch (e) {
                // 4.2.1
                throw new Errors.Create.UuBinaryCreateFailed({ uuAppErrorMap }, e);
            }
        }

        // hds 5
        if (dtoIn.categoryIdList && dtoIn.categoryIdList.length) {
            const { validCategories, invalidCategories } = await Patient.checkCategoriesExistence(awid, dtoIn.categoryIdList);
            // 5.1
            if (invalidCategories.length > 0) {
                ValidationHelper.addWarning(
                    uuAppErrorMap,
                    Warnings.Create.CategoryDoesNotExist.code,
                    Warnings.Create.CategoryDoesNotExist.message,
                    { categoryIdList: invalidCategories }
                );
            }
            uuObject.categoryIdList = validCategories;
        } else {
            uuObject.categoryIdList = [];
        }

        // hds 6
        uuObject.awid = awid;
        let patient;

        try {
            patient = await this.dao.create(uuObject);
        } catch (e) {
            // 6.1
            if (e instanceof ObjectStoreError) {
                throw new Errors.Create.PatientDaoCreateFailed({ uuAppErrorMap }, e);
            }
            throw e;
        }

        // hds 7
        const dtoOut = {
            ...patient,
            uuAppErrorMap,
        };

        return dtoOut;
    }
}

module.exports = new CreateAbl();