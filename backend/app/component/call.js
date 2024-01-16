//@@viewOn:imports
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { Schemas, PATIENT } = require("../abl/constants");
const { Base64 } = require("uu_appg01_server").Utils;
//@@viewOff:imports

//@@viewOn:components
class Call {
  constructor() {
    this.patientDao = DaoFactory.getDao(Schemas.PATIENT);
  }

  /**
   * Checks whether categories exist for specified awid and removes them from categoryList (so it, in the end, contains
   * only ids of categories, that do not exist).
   * @param {String} awid Used awid
   * @param {Array} categoryIdList An array with ids of categories
   * @returns {Promise<[]>} Ids of existing categories
   */
  async getPatientById(awid, buttonId) {
    const patientList = await this.patientDao.listByButtonId(awid, buttonId, "date", "dsc", 100);
    const patient = patientList.itemList[0];
    return patient;
  }

  //
  // async checkCategoriesExistence(awid, categoryIdList = []) {
  //   const validCategories = [];
  //   const invalidCategories = [];
  //   let categoryFound;
  //   const storedCategories = await this.categoryDao.listByIdList(awid, categoryIdList);
  //   categoryIdList.forEach((id) => {
  //     categoryFound = storedCategories.itemList.find((it) => it.id.toString() === id);
  //     if (categoryFound) {
  //       validCategories.push(id.toString());
  //     } else {
  //       invalidCategories.push(id.toString());
  //     }
  //   });
  //
  //   return { validCategories: [...new Set(validCategories)], invalidCategories: [...new Set(invalidCategories)] };
  // }

  /**
   * Checks whether image is of proper content-type
   * @param {Stream|Base64} image Image as stream or base64
   * @param {Object} errors Object with error definitions
   * @returns {Promise<[]>} Binary stream
   */

}
//@@viewOff:components

//@@viewOn:exports
module.exports = new Call();
//@@viewOff:exports
