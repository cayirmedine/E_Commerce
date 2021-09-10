const {
  imageModel,
  campaignProductModel,
  campaignModel,
  sequelize,
} = require("../database/db");
const modelService = require("../services/modelService");
const attributes = require("../helpers/attributes");
const { arrayDataCreate } = require("../services/arrayDataOperationsService");

const { Op } = require("sequelize");

const { paginate } = require("../services/paginate");

var moment = require("moment");
var now = moment(new Date());

const {
  relationalCreate,
  relationalUpdate,
  relationalDelete,
} = require("../services/imageModelRelationsService");

module.exports = {
  //GET /admin/product/campaigns(Web)
  campaignsFindAll: async (req, res, next) => {
    let page = req.query.page;
    let options = {
      include: [{ model: imageModel, attributes: attributes.imageModel }],
    };

    try {
      const campaigns = await paginate(campaignModel, options, page);

      res.json({ status: "Success", data: campaigns });
    } catch (error) {
      error.message = "Get all campaigns is not successful: " + error;
      next(error);
    }
  },

  //GET /home/campaigns(Mobile)
  campaignsFindAllMobile: async (req, res, next) => {
    let page = req.query.page;
    let options = {
      include: [{ model: imageModel, attributes: attributes.imageModel }],
      where: {
        startDate: {
          [Op.lte]: now,
        },
        endDate: {
          [Op.gte]: now,
        },
      },
    };

    try {
      const campaigns = await paginate(campaignModel, options, page);

      res.json({ status: "Success", data: campaigns });
    } catch (error) {
      error.message = "Get all campaigns is not successful: " + error;
      next(error);
    }
  },

  //POST /admin/product/campaigns(Web)
  createCampaign: async (req, res, next) => {
    var t = await sequelize.transaction();
    const { title, description, startDate, endDate, isInSlider, products } =
      req.body;

    var start = moment(startDate);
    var end = moment(endDate);
    var nowToEnd = moment.duration(end.diff(now));
    var nowToStart = moment.duration(now.diff(start));

    if (nowToEnd > 0) {
      var isActive = true;
      if (nowToStart < 0) {
        isActive = false;
      }
    }

    let campaignOptions = {
      title: title,
      description: description,
      startDate: startDate,
      endDate: endDate,
      isActive: isActive,
      isInSlider: isInSlider,
    };

    try {
      const campaign = await relationalCreate(
        req,
        campaignModel,
        campaignOptions,
        t,
        "campaign_id"
      );

      if (products != undefined) {
        var productCount = await arrayDataCreate(
          products,
          campaignProductModel,
          { campaign_id: campaign.id },
          "product_id",
          t
        );
      }

      await t.commit();

      res.json({ status: "Success", data: { campaign, productCount } });
    } catch (error) {
      res.status(422).send({ status: "Error", data: error.message });
      await t.rollback();
      next(error);
    }
  },

  //GET /admin/product/campaign-product/:campaignId(Web)
  campaignProductFindAll: async (req, res, next) => {
    const { campaignId } = req.params;
    let page = req.query.page;

    let option = {
      where: { campaign_id: campaignId },
    };

    try {
      const campaignProduct = await paginate(
        campaignProductModel,
        option,
        page
      );

      res.json({ status: "Success", data: campaignProduct });
    } catch (error) {
      error.message = "Get campaign's products in not successful: " + error;
      next(error);
    }
  },

  //GET /admin/product/campaigns/:campaignId(Web) & /home/campaign-detail/:campaignId(Mobile)
  campaignFindOne: async (req, res, next) => {
    const { campaignId } = req.params;

    let condition = {
      where: {
        id: campaignId,
      },
    };

    try {
      const campaign = await modelService.findOne(campaignModel, condition);

      res.json({ status: "Success", data: campaign });
    } catch (error) {
      error.message = "Get campaign's details is not successful: " + error;
      next(error);
    }
  },

  //PUT /admin/product/campaigns/:campaignId(Web)
  updateCampaign: async (req, res, next) => {
    const t = await sequelize.transaction();
    const { campaignId } = req.params;
    const { products, productsToDelete } = req.body;
    console.log(products);

    try {
      var updatedCampaign = await relationalUpdate(
        req,
        campaignModel,
        campaignId,
        req.body,
        t,
        "campaign_id"
      );

      if (productsToDelete != undefined) {
        for (product of productsToDelete) {
          try {
            await modelService.delete(
              campaignProductModel,
              { where: { product_id: product } },
              { transaction: t }
            );
          } catch (error) {
            throw new Error("Product can not removed from DB");
          }
        }
      }

      if (products != undefined) {
        var productCount = await arrayDataCreate(
          products,
          campaignProductModel,
          { campaign_id: campaignId },
          "product_id",
          t
        );
      }

      await t.commit();

      res.json({ status: "Success", data: { updatedCampaign, productCount } });
    } catch (error) {
      res.status(422).send({ status: "Error", data: error.message });
      await t.rollback();
      next(error);
    }
  },

  //DELETE /admin/product/campaigns/:campaignId(Web)
  deleteCampaign: async (req, res, next) => {
    const t = await sequelize.transaction();
    const { campaignId } = req.params;

    try {
      const deletedCampaign = await relationalDelete(
        campaignModel,
        "campaign_id",
        campaignId,
        { transaction: t }
      );

      await t.commit();
      res.json({ status: "Success", data: deletedCampaign });
    } catch (error) {
      res.status(422).send({ status: "Error", data: error.message });
      await t.rollback();
      next(error);
    }
  },
};
