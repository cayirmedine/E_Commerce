const {
  imageModel,
  campaignProductModel,
  campaignModel,
  sliderModel,
  sequelize,
} = require("../database/db");
const modelService = require("../services/modelService");
const attributes = require("../helpers/attributes");

const { Op } = require("sequelize");

const { paginate } = require("../services/paginate");

var moment = require("moment");
var now = moment(new Date());

const {
  relationalCreate,
  relationalUpdate,
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
    const t = await sequelize.transaction();
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

      for (const product of products) {
        await modelService.create(
          campaignProductModel,
          {
            campaign_id: campaign.id,
            product_id: product,
          },
          { transaction: t }
        );
      }

      await t.commit();

      res.json({ status: "Success", data: campaign });
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
    // const { location } = req.file;
    const { products } = req.body;
    console.log(products);

    // let campaignCondition = {
    //   where: {
    //     id: campaignId,
    //   },
    // };

    // let imageSliderCondition = {
    //   where: {
    //     campaign_id: campaignId,
    //   },
    // };

    try {
      // const updatedCampaign = await modelService.update(
      //   campaignModel,
      //   req.body,
      //   campaignCondition
      // );

      // // if (isInSlider) {
      //   if (isInSlider == "true") {
      //     // const slider = await modelService.create(sliderModel, {
      //     //   title: title,
      //     //   campaign_id: campaignId,
      //     // });

      //     // await modelService.update(
      //     //   imageModel,
      //     //   { uri: location, slider_id: slider.id },
      //     //   imageSliderCondition
      //     // );
      //   } else {
      //     await modelService.delete(sliderModel, imageSliderCondition);
      //     await modelService.update(
      //       imageModel,
      //       { uri: location },
      //       imageSliderCondition
      //     );
      //   }
      // }
      var updatedCampaign = await relationalUpdate(
        req,
        campaignModel,
        campaignId,
        req.body,
        t,
        "campaign_id"
      );

      if (products != undefined) {
        console.log("Inside of product condition");
        await modelService.delete(
          campaignProductModel,
          {
            where: {
              campaign_id: campaignId,
            },
          },
          { transaction: t }
        );

        for(const product of products) {
          try {
            await modelService.create(
              campaignProductModel,
              { product_id: product, campaign_id: campaignId },
              { transaction: t }
            );
          } catch (error) {
            throw new Error("Product(s) can not be added to db");
          }
        };
      }

      await t.commit();

      res.json({ status: "Success", data: updatedCampaign });
    } catch (error) {
      res.status(422).send({ status: "Error", data: error.message });
      await t.rollback();
      next(error);
    }
  },

  //DELETE /admin/product/campaigns/:campaignId(Web)
  deleteCampaign: async (req, res, next) => {
    const { campaignId } = req.params;

    let condition = {
      where: {
        campaign_id: campaignId,
      },
    };

    let campaignCondition = {
      where: {
        id: campaignId,
      },
    };

    try {
      await modelService.delete(imageModel, condition);

      const slider = await modelService.findOne(sliderModel, condition);

      if (slider) {
        await modelService.delete(sliderModel, condition);
      }

      await modelService.delete(campaignProductModel, condition);

      const deletedCampaign = await modelService.delete(
        campaignModel,
        campaignCondition
      );

      res.json({ status: "Success", data: deletedCampaign });
    } catch (error) {
      error.message = "Delete campaign is not successful: " + error;
      next(error);
    }
  },
};
