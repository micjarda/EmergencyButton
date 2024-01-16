"use strict";

const BackendMainUseCaseError = require("./backend-main-use-case-error");
const Errors = require("./backend-main-error");

const List = {
  UC_CODE: `${BackendMainUseCaseError.ERROR_PREFIX}list/`,
  invalidDtoIn: class extends BackendMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}/invalidDtoIn}`;
      this.message = `DtoIn is not valid`;
    }
  },

};


const Create = {
  UC_CODE: `${BackendMainUseCaseError.ERROR_PREFIX}call/create`,

  invalidDtoIn: class extends BackendMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}/invalidDtoIn}`;
      this.message = `DtoIn is not valid`;
    }
  },

  callDaoCreateFailed: class extends BackendMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}/callDaoCreateFailed`;
      this.message = `Create call by call create failed.`;
    }
  }
}

const Update = {
  UC_CODE: `${BackendMainUseCaseError.ERROR_PREFIX}call/update/`,
  InvalidDtoIn: class extends BackendMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  CallsMainDoesNotExist: class extends BackendMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}callsMainDoesNotExist`;
      this.message = "UuObject callsMain does not exist.";
    }
  },
  CallsMainNotInCorrectState: class extends BackendMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}callsMainNotInCorrectState`;
      this.message = "UuObject callsMain is not in correct state.";
    }
  },

  TextCannotBeRemoved: class extends BackendMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}textCannotBeRemoved`;
      this.message = "Text cannot be removed if call would end up without both text and image.";
    }
  },
  ImageCannotBeDeleted: class extends BackendMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}imageCannotBeDeleted`;
      this.message = "Image cannot be deleted if call would end up without both text and image.";
    }
  },
  UserNotAuthorized: class extends BackendMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}userNotAuthorized`;
      this.message = "User not authorized.";
    }
  },
  CallDoesNotExist: class extends BackendMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}callDoesNotExist`;
      this.message = "Call does not exist.";
    }
  },
  UuBinaryCreateFailed: class extends BackendMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}uuBinaryCreateFailed`;
      this.message = "Creating uuBinary failed.";
    }
  },
  UuBinaryUpdateBinaryDataFailed: class extends BackendMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}uuBinaryUpdateBinaryDataFailed`;
      this.message = "Updating uuBinary data failed.";
    }
  },
  InvalidImage: class extends BackendMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidImage`;
      this.message = "Image is invalid or it is not an image.";
    }
  },
  CallDaoUpdateFailed: class extends BackendMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}callDaoUpdateFailed`;
      this.message = "Update call by call Dao update failed.";
    }
  },
};

module.exports = {
  Create,
  List,
  Update
}
