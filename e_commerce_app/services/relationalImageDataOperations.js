const { imageModel } = require("../database/db");
const modelService = require("./modelService");

module.exports = {
  createRelationalImageData: async (
    imageArray,
    imageType,
    relationalData,
    t
  ) => {
    if (imageArray.length == 1) {
      await modelService.create(
        imageModel,
        { uri: imageArray[0].location, [imageType]: relationalData.id },
        { transaction: t }
      );
    } else {
      for (const img of imageArray) {
        await modelService.create(
          imageModel,
          {
            uri: img.location,
            [imageType]: relationalData.id,
          },
          { transaction: t }
        );
      }
    }
  },

  updateRelationalImageData: async (imageArray, imageType, modelId, t) => {
    var image;
    if(imageArray.length == 1) {
      image = await modelService.update(
        imageModel,
        { uri: imageArray[0].location },
        {
          where: {
            [imageType]: modelId
          }
        },
        { transaction: t }
      )
    } else {

    }

    return image;
  }
};
