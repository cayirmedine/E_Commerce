const validator = require("./validate");

module.exports = {
  createCategory: (req, res, next) => {
    const validationRuleBody = {
      title: "required|string",
    };

    // const validationRuleFile = {
    //   image: "required",
    // };

    validator(req.body, validationRuleBody, {}, (error, status) => {
      if (!status) {
        res.status(422).send({ status: "Error", data: error });
      } else {
        next();
      }
    });

    // validator(req.file, validationRuleFile, {}, (error, status) => {
    //   if (!status) {
    //     res.status(422).send({ status: "Error", data: error });
    //   } else {
    //     next();
    //   }
    // });
  },

  updateCategory: (req, res, next) => {
    const validationRuleBody = {
      title: "string",
    };

    validator(req.body, validationRuleBody, {}, (error, status) => {
      if (!status) {
        res.status(422).send({ status: "Error", data: error });
      } else {
        next();
      }
    });
  },

  createSubCat: (req, res, next) => {
    const validationRule = {
      title: "required|string",
      cat_id: "required|integer",
    };

    validator(req.body, validationRule, {}, (error, status) => {
      if (!status) {
        res.status(422).send({ status: "Error", data: error });
      } else {
        next();
      }
    });
  },

  updateSubCat: (req, res, next) => {
    const validationRule = {
      title: "string",
      cat_id: "integer",
    };

    validator(req.body, validationRule, {}, (error, status) => {
      if (!status) {
        res.status(422).send({ status: "Error", data: error });
      } else {
        next();
      }
    });
  },

  createProduct: (req, res, next) => {
    const validationRule = {
      title: "required|string",
      unitPrice: "required|numeric",
      description: "required|string",
      cat_id: "required|integer",
      subCat_id: "required|integer",
    };

    validator(req.body, validationRule, {}, (error, status) => {
      if (!status) {
        res.status(422).send({ status: "Error", data: error });
      } else {
        next();
      }
    });
  },

  updateProduct: (req, res, next) => {
    const validationRule = {
      title: "string",
      unitPrice: "numeric",
      description: "string",
      cat_id: "integer",
      subCat_id: "integer",
    };

    validator(req.body, validationRule, {}, (error, status) => {
      if (!status) {
        res.status(422).send({ status: "Error", data: error });
      } else {
        next();
      }
    });
  },

  createCampaign: (req, res, next) => {

    const validationRule = {
      title: "required|string",
      description: "required|string",
      startDate: "required|date",
      endDate: "required|date|after:startDate",
      isActive: "boolean",
      isInSlider: "required|boolean",
      products: "required|array",
    };

    validator(req.body, validationRule, {}, (error, status) => {
      if (!status) {
        res.status(422).send({ status: "Error", data: error });
      } else {
        next();
      }
    });
  },

  updateCampaign: (req, res, next) => {
    const validationRule = {
      title: "string",
      description: "string",
      startDate: "date",
      endDate: "date|after_or_equal:startDate",
      isActive: "boolean",
      isInSlider: "boolean",
      products: "array",
    };

    validator(req.body, validationRule, {}, (error, status) => {
      if (!status) {
        res.status(422).send({ status: "Error", data: error });
      } else {
        next();
      }
    });
  },
};
