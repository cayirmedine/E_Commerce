const {
  createRelationalImageData,
  updateRelationalImageData,
  deleteRelationalImageData,
} = require("./relationalImageDataOperations");
const modelService = require("../services/modelService");
const {
  createSlider,
  updateSlidersImage,
  updateSlider,
  deleteSlider,
} = require("../services/sliderService");
const { imageModel, sliderModel } = require("../database/db");

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
        await createRelationalImageData(
          [req.file],
          imageType,
          createdData.id,
          t
        );
      }

      if (req.files != undefined)
        await createRelationalImageData(
          req.files,
          imageType,
          createdData.id,
          t
        );
    }
    return createdData;
  },

  relationalUpdate: async (
    req,
    modelName,
    modelId,
    modelOptions,
    t,
    imageType
  ) => {
    const { isInSlider, title } = req.body;

    const data = await modelService.findOne(
      modelName,
      {
        where: { id: modelId },
      },
      { transaction: t }
    );

    if (isInSlider != undefined) {
      if (!data.isInSlider && isInSlider == "true") {
        await updateSlidersImage(
          req,
          { title: title, [imageType]: modelId },
          t,
          modelId,
          imageType
        );
      } else if (data.isInSlider && isInSlider == "false") {
        await deleteSlider({ where: { [imageType]: modelId } }, t);
      }
    } else {
      if (data.isInSlider) {
        await updateSlider(req, { title: title }, modelId, imageType, t);
      } else {
        if (req.file != undefined) {
          var images = await updateRelationalImageData(
            [req.file],
            imageType,
            modelId,
            t
          );
        }

        if (req.files != undefined) {
          var images = await modelService.delete(imageModel, {
            where: { [imageType]: modelId },
          });
          await updateRelationalImageData(req.files, imageType, modelId, t);
        }
      }
    }

    const updatedData = await modelService.update(
      modelName,
      modelOptions,
      {
        where: {
          id: modelId,
        },
      },
      { transaction: t }
    );

    return { updatedData, images };
  },

  relationalDelete: async (modelName, modelType, modelId, t) => {
    await deleteRelationalImageData(modelType, modelId, t);

    const data = await modelService.findOne(modelName, {
      where: { id: modelId },
    });

    if (data.isInSlider == "true") {
      modelService.delete(sliderModel, { where: { [modelType]: modelId } });
    }

    const deletedData = await modelService.delete(
      modelName,
      { where: { id: modelId } },
      t
    );

    return deletedData;
  },
};
