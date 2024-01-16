"use strict";
const { ObjectId } = require("bson");
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class CallMongo extends UuObjectDao {
  constructor(...args) {
    super(...args);
  }

  async createSchema() {
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
    await super.createIndex({ awid: 1, categoryIdList: 1 });
    await super.createIndex({ awid: 1, name: 1 });
    await super.createIndex({ awid: 1, averageRating: 1 });
  }

  async get(awid, id) {
    return await super.findOne({ id, awid });
  }

  async list(awid, sortBy, order, pageInfo) {
    const filter = { awid };

    const sort = {
      [sortBy]: order === "asc" ? 1 : -1,
    };

    return await super.find(filter, pageInfo, sort);
  }

  async listByCategoryIdList(awid, categoryIdList, sortBy, order, pageInfo) {
    const filter = {
      awid,
      categoryIdList: {
        $in: categoryIdList.map((id) => new ObjectId(id)),
      },
    };

    const sort = {
      [sortBy]: order === "asc" ? 1 : -1,
    };

    return await super.find(filter, pageInfo, sort);
  }

  async create(call) {
    return super.insertOne(call)
  }

  async update(uuObject) {
    if (uuObject.categoryIdList) {
      uuObject.categoryIdList = uuObject.categoryIdList.map((categoryId) => new ObjectId(categoryId));
    }
    let filter = { id: uuObject.id, awid: uuObject.awid };
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }

}

module.exports = CallMongo;
