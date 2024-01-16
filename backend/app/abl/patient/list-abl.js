"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/patient-error");
const Warnings = require("../../api/warnings/patient-warning");
const { Profiles, Schemas } = require("../constants");

const DEFAULTS = {
    sortBy: "name",
    order: "asc",
    pageIndex: 0,
    pageSize: 100,
};

class ListAbl {
    constructor() {
        this.validator = Validator.load();
        this.dao = DaoFactory.getDao(Schemas.PATIENT);
    }

    async list(awid, dtoIn, authorizationResult) {
        let uuAppErrorMap = {};

        // hds 1, 1.1
        const validationResult = this.validator.validate("patientListDtoInType", dtoIn);
        // 1.2, 1.2.1, 1.3, 1.3.1
        uuAppErrorMap = ValidationHelper.processValidationResult(
            dtoIn,
            validationResult,
            uuAppErrorMap,
            Warnings.List.UnsupportedKeys.code,
            Errors.List.InvalidDtoIn
        );

        // 1.4
        if (!dtoIn.sortBy) dtoIn.sortBy = DEFAULTS.sortBy;
        if (!dtoIn.order) dtoIn.order = DEFAULTS.order;
        if (!dtoIn.pageInfo) dtoIn.pageInfo = {};
        if (!dtoIn.pageInfo.pageSize) dtoIn.pageInfo.pageSize = DEFAULTS.pageSize;
        if (!dtoIn.pageInfo.pageIndex) dtoIn.pageInfo.pageIndex = DEFAULTS.pageIndex;

        // hds 3
        let list;
        if (dtoIn.categoryIdList) {
            // 3.A
            list = await this.dao.listByCategoryIdList(awid, dtoIn.categoryIdList, dtoIn.sortBy, dtoIn.order, dtoIn.pageInfo);
        } else {
            // 3.B
            list = await this.dao.list(awid, dtoIn.sortBy, dtoIn.order, dtoIn.pageInfo);
        }

        // hds 4
        const dtoOut = {
            ...list,
            uuAppErrorMap,
        };

        return dtoOut;
    }
}

module.exports = new ListAbl();