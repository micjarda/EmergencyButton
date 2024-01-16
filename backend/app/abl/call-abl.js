"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const Call = require("../component/call")

const Errors = require("../api/errors/call-error.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  }
}

class CallAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("call")
  }
  async create(awid, dtoIn){
    let validationResult = this.validator.validate("callCreate", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.invalidDtoIn)

    dtoIn.awid = awid;
    const buttonIdArray = dtoIn.buttonId.split("/")
    const buttonId = buttonIdArray[1]
    const patient = await Call.getPatientById(awid, buttonId);
    dtoIn.patient = patient;
    dtoIn.date = new Date();
    let dtoOut;
    try {
      dtoOut = await this.dao.create(dtoIn)
    } catch (e) {

      if (e instanceof ObjectStoreError) {
        throw new Errors.Create.callDaoCreateFailed({ uuAppErrorMap }, e)
      }
      throw e;
    }
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }
}

module.exports = new CallAbl();
