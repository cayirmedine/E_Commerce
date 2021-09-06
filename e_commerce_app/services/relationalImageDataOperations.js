const { imageModel } = require("../database/db");
const modelService = require("./modelService");

module.exports = {
  createRelationalImageData: async (
    imageArray,
    imageType,
    relationalDataId,
    t
  ) => {
    var images;
    if (imageArray.length == 1) {
      images = await modelService.create(
        imageModel,
        { uri: imageArray[0].location, [imageType]: relationalDataId },
        { transaction: t }
      );
    } else {
      for (const img of imageArray) {
        images = await modelService.create(
          imageModel,
          {
            uri: img.location,
            [imageType]: relationalDataId,
          },
          { transaction: t }
        );
      }
    }
    return images;
  },

  updateRelationalImageData: async (imageArray, imageType, modelId, t) => {
    var images;
    if (imageArray.length == 1) {
      images = await modelService.update(
        imageModel,
        { uri: imageArray[0].location },
        {
          where: {
            [imageType]: modelId,
          },
        },
        { transaction: t }
      );
    } else {
      for (const img of imageArray) {
        const test = await modelService.create(
          imageModel,
          {
            uri: img.location,
            [imageType]: modelId,
          },
          { transaction: t }
        );
        console.log(test);
      }
    }
    return images;
  },

  deleteRelationalImageData: async (imageType, modelId, t) => {
    await modelService.delete(imageModel, { where: { [imageType]: modelId } }, t);
  },
};
