const { sliderModel, imageModel } = require("../database/db");
const slider = require("../models/home/slider");
const modelService = require("../services/modelService");

module.exports = {
  createSlider: async (req, options, t) => {
    const slider = await modelService.create(sliderModel, options, {
      transaction: t,
    });

    if (req.file == undefined) {
      throw new Error("Image field is required");
    }

    const { location } = req.file;

    await modelService.create(
      imageModel,
      {
        uri: location,
        slider_id: slider.id,
        campaign_id: slider.campaign_id,
      },
      { transaction: t }
    );

    return slider;
  },

  updateSlidersImage: async (req, options, modelId, modelType, t) => {
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

  updateSlider: async (req, options, t, modelId, modelType) => {
    const slider = await modelService.update(
      sliderModel,
      options,
      {
        where: { [modelType]: modelId },
      },
      t
    );

    if (req.file != undefined) {
      let { location } = req.file;
      await modelService.update(
        imageModel,
        { uri: location, slider_id: slider.id },
        { where: { [modelType]: modelId } },
        t
      );
    }
    return slider;
  },

  deleteSlider: async (conditions, t) => {
    const slider = await modelService.delete(sliderModel, conditions, {
      transaction: t,
    });
    return slider;
  },
};
