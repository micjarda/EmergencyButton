"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/call-error");
const Warnings = require("../../api/warnings/call-warning");
const { Profiles, Schemas } = require("../constants");

class UpdateAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Schemas.CALL);
  }

  async update(awid, dtoIn, session, authorizationResult) {
    let uuAppErrorMap = {};

    const validationResult = this.validator.validate("callUpdateDtoIn", dtoIn);
    console.log("hello")
    // 1.2, 1.2.1, 1.3, 1.3.1
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Update.UnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );
    // hds 3, 3.1

    // hds 4
    const call = await this.dao.get(awid, dtoIn.id);
    if (!call) {
      // 4.1
      throw new Errors.Update.CallDoesNotExist({ uuAppErrorMap }, { callId: dtoIn.id });
    }

    // hds 5


    // hds 7, 7.1
    const toUpdate = { ...dtoIn };
    // Note: empty array is valid (possibility to remove all categories)





    // hds 10
    toUpdate.awid = awid;
    let updatedCall;
    try {
      updatedCall = await this.dao.update(toUpdate);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        // 10.1
        throw new Errors.Update.CallDaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // hds 11
    const dtoOut = {
      ...updatedCall,
      uuAppErrorMap,
    };

    return dtoOut;
  }
}

module.exports = new UpdateAbl();
