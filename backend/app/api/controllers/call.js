"use strict";
const CallAbl = require("../../abl/call-abl");
const ListAbl = require("../../abl/call/list-abl");
const UpdateAbl = require("../../abl/call/update-abl");

class Call {
  helloThere() {
    return {
      text: "General Kenobi",
      uuAppErrorMap: {}
    }
  }

  list(ucEnv) {
    return ListAbl.list(ucEnv.getUri().getAwid(), ucEnv.parameters, ucEnv.getAuthorizationResult());
  }

  create(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();
    let awid = ucEnv.getUri().getAwid();
    return CallAbl.create(awid, dtoIn);
  }

  update(ucEnv) {

    return UpdateAbl.update(ucEnv.getUri().getAwid(), ucEnv.parameters, ucEnv.session, ucEnv.getAuthorizationResult());
  }
}

module.exports = new Call();
