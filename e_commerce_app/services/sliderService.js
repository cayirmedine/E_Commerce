const { sliderModel, imageModel } = require("../database/db");
const modelService = require("../services/modelService");

module.exports = {
  createSlider: async (req, options, t) => {
    const slider = await modelService.create(sliderModel, options, {
      transaction: t,
    });

    if (req.file == null) {
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
};
