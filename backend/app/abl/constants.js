//@@viewOn:constants
const Constants = {
  Schemas: {
    CALL_MAIN: "callMain",
    CATEGORY: "category",
    CALL: "call",
    PATIENT: "patient",
    // TODO: Add other schemas when you configure one in persistance.json and create mongo file for it
  },

  Call: {
    States: {
      INIT: "init",
      ACTIVE: "active",
      UNDER_CONSTRUCTION: "underConstruction",
      CLOSED: "closed",
    },
    get NonFinalStates() {
      return new Set([this.States.ACTIVE, this.States.UNDER_CONSTRUCTION]);
    },
  },

  Patient: {
    States: {
      INIT: "init",
      ACTIVE: "active",
      UNDER_CONSTRUCTION: "underConstruction",
      CLOSED: "closed",
    },
    get NonFinalStates() {
      return new Set([this.States.ACTIVE, this.States.UNDER_CONSTRUCTION]);
    },
  },

  Profiles: {
    AUTHORITIES: "Authorities",
    EXECUTIVES: "Executives",
    READERS: "Readers",
  },
};
//@@viewOff:constants

//@@viewOn:exports
module.exports = Constants;
//@@viewOff:exports
