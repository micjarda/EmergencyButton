"use strict";
const ListAbl = require("../../abl/patient/list-abl");
const GetAbl = require("../../abl/patient/get-abl");
const CreateAbl = require("../../abl/patient/create-abl");

class PatientController {

    static list(ucEnv) {
        return ListAbl.list(ucEnv.getUri().getAwid(), ucEnv.parameters, ucEnv.getAuthorizationResult());
    }


    // get
    static get(ucEnv) {
        return GetAbl.get(ucEnv.getUri().getAwid(), ucEnv.parameters, ucEnv.getAuthorizationResult());
    }

    // create
    static create(ucEnv) {
        return CreateAbl.create(ucEnv.getUri().getAwid(), ucEnv.parameters, ucEnv.session, ucEnv.getAuthorizationResult());
    }
    // update

    // delete

}

module.exports = PatientController;