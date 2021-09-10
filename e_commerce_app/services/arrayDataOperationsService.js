const modelService = require("../services/modelService");

module.exports = {
  arrayDataCreate: async (array, modelName, options, dataType, t) => {
    var productCount = 0;
    for (const data of array) {
      const numData = parseInt(data);
      console.log({ ...options, [dataType]: numData });

      await modelService.create(
        modelName,
        { ...options, [dataType]: numData },
        { transaction: t }
      );
      await productCount++;
    }

    return productCount;
  },
};
