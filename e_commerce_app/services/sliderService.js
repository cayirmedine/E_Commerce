const { sliderModel, imageModel } = require("../database/db");
const slider = require("../models/home/slider");
const modelService = require("../services/modelService");
const {
  createRelationalImageData,
  updateRelationalImageData,
} = require("./relationalImageDataOperations");

module.exports = {
  createSlider: async (req, options, t) => {
    const slider = await modelService.create(sliderModel, options, {
      transaction: t,
    });

    if (req.file == undefined) {
      throw new Error("Image field is required");
    } else {
      await createRelationalImageData([req.file], ["slider_id","campaign_id"], [slider.id, slider.campaign_id], t);
    }

    // const { location } = req.file;

    // await modelService.create(
    //   imageModel,
    //   {
    //     uri: location,
    //     slider_id: slider.id,
    //     campaign_id: slider.campaign_id,
    //   },
    //   { transaction: t }
    // );

    return slider;
  },

  updateSlidersImage: async (req, options, t, modelId, modelType) => {
    const slider = await modelService.create(sliderModel, options, {
      transaction: t,
    });

    if (req.file != undefined) {
      const { location } = req.file;
      await modelService.update(
        imageModel,
        { uri: location, slider_id: slider.id },
        { where: { [modelType]: modelId } },
        { transaction: t }
      );
    }

    return slider;
  },

  deleteSlider: async (conditions, t) => {
    await modelService.delete(sliderModel, conditions, { transaction: t });
    return slider;
  },
};
