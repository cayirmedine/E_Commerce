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
      var imageCounter = 0;
      for (const img of imageArray) {
        await modelService.create(
          imageModel,
          {
            uri: img.location,
            [imageType]: modelId,
          },
          { transaction: t }
        );
        await imageCounter++;
      }
      images = (await imageCounter) + " image(s) are updated";
    }
    return images;
  },

  deleteRelationalImageData: async (imageType, modelId, t) => {
    await modelService.delete(
      imageModel,
      { where: { [imageType]: modelId } },
      t
    );
  },
};
