const { createRelationalImageData, updateRelationalImageData } = require("./relationalImageDataOperations");
const modelService = require("../services/modelService");
const { createSlider } = require("../services/sliderService");

module.exports = {
  relationalCreate: async (req, modelName, options, t, imageType) => {
    const createdData = await modelService.create(modelName, options, {
      transaction: t,
    });

    if (createdData.isInSlider) {
        await createSlider(
          req,
          {
            title: createdData.title,
            [imageType]: createdData.id,
          },
          t
        );
    } else {
        
      if (req.file == undefined && req.files == undefined) {
        throw new Error("Image(s) field is required");
      }

      if (req.file != undefined) {
        await createRelationalImageData([req.file], imageType, createdData, t);
      }

      if (req.files != undefined)
        await createRelationalImageData(req.files, imageType, createdData, t);
    }
    return createdData;
  },

  relationalUpdate: async (req, modelName, modelId, modelOptions, t, imageType) => {
    const updatedData = await modelService.update(
        modelName,
        modelOptions,
        {
          where: {
            id: modelId
          }
        },
        { transaction: t }
      );

      if (req.file != undefined) {
        // const { location } = req.file;
        // var image = await modelService.update(
        //   imageModel,
        //   { uri: location },
        //   { 
        //     where: {
        //     [imageType]: modelId 
        //     }
        //   }
        // );
        var image = await updateRelationalImageData([req.file], imageType, modelId, t);
      }

      return {updatedData, image};
  }
};
