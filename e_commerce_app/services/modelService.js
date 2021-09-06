module.exports = {
  // get all data
  findAll: async function (model, options, transaction) {
    return await model.findAll(options);
  },

  // find a specific data based on ID
  findOne: async function (model, options, transaction) {
    return await model.findOne(options, transaction);
  },

  // created a data
  create: async function (model, options, transaction) {
    return await model.create(options, transaction);
  },

  // find or created a data
  findOrCreate: async function (model, options, transaction) {
    const [data, created] = await model.findOrCreate(options, transaction);
    if (created == true) {
      return data;
    }
  },

  // update a data
  update: async function (model, updatedAttr, whereCondition, transaction) {
    return await model.update(updatedAttr, whereCondition, transaction);
  },

  // delete a data
  delete: async function (model, options, transaction) {
    return await model.destroy(options, transaction);
  },
};
