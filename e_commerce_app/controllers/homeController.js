const { favModel, imageModel, sliderModel, sequelize } = require("../database/db");
const { createSlider, updateSlider } = require("../services/sliderService");
const modelService = require("../services/modelService");
const attributes = require("../helpers/attributes");
const { paginate } = require("../services/paginate");

module.exports = {
  //POST /home/add-slider
  createSlider: async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
      const slider = await createSlider(req, req.body, t);
      await t.commit();
      res.json({ status: "Success", data: slider });
    } catch (error) {
      res.status(422).send({ status: "Error", data: error.message });
      await t.rollback();
      next(error);
    }
  },

  //GET /home/all-sliders
  slidersFindAll: async (req, res, next) => {
    let options = {
      include: [{ model: imageModel, attributes: attributes.imageModel }],
    };

    try {
      const sliders = await modelService.findAll(sliderModel, options);

      res.json({ status: "Success", data: sliders });
    } catch (error) {
      error.message = "Get all sliders is not successful: " + error;
      next(error);
    }
  },

  //PUT /home/update-slider/:sliderId
  updateSlider: async (req, res, next) => {
    const t = await sequelize.transaction();
    const { sliderId } = req.params;
    try {
      const updatedSlider = await updateSlider(req, { where: { id: sliderId }}, { transaction: t });

      await t.commit();

      res.json({ status: "Success", data: updatedSlider });

    } catch(error) {
      res.status(422).send({ status: "Error", data: error.message });
      await t.rollback();
      next(error);
    }
  },

  //POST /home/add-fav
  createFav: async (req, res, next) => {
    try {
      const fav = await modelService.create(favModel, req.body);

      res.json({ status: "Success", data: fav });
    } catch (error) {
      error.message = "Add fav is not successful: " + error;
      next(error);
    }
  },

  //GET /home/favs/:userId
  usersFavsFindAll: async (req, res, next) => {
    const { userId } = req.params;
    let page = req.query.page;
    let option = {
      where: {
        user_id: userId,
      },
    };

    try {
      const favs = await paginate(favModel, option, page);

      res.json({ status: "Success", data: favs });
    } catch (error) {
      error.message = "Get user's favs is not successful: " + error;
      next(error);
    }
  },

  //DELETE /home/delete-fav/:favId
  deleteFav: async (req, res, next) => {
    const { favId } = req.params;

    let option = {
      where: {
        id: favId,
      },
    };

    try {
      const deletedFav = await modelService.delete(favModel, option);

      res.json({ status: "Success", data: deletedFav });
    } catch (error) {
      error.message = "Delete user's fav is not successful: " + error;
      next(error);
    }
  },
};
