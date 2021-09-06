const {
  productCatModel,
  imageModel,
  productSubCatModel,
  productModel,
} = require("../database/db");
const modelService = require("../services/modelService");
const attributes = require("../helpers/attributes");

const { paginate } = require("../services/paginate");

const { sequelize } = require("../database/db");

const {
  relationalCreate,
  relationalUpdate,
  relationalDelete,
} = require("../services/imageModelRelationsService");

module.exports = {
  //GET /admin/product/categories(Web) & /product/categories(Mobile)
  categoriesFindAll: async (req, res, next) => {
    let page = req.query.page;

    let options = {
      include: [{ model: imageModel, attributes: attributes.imageModel }],
    };

    try {
      const productCategories = await paginate(productCatModel, options, page);
      res.json({ status: "Success", data: productCategories });
    } catch (error) {
      error.message = "Get categories is not successful: " + error;
      next(error);
    }
  },

  //POST /admin/product/categories(Web)
  createCategory: async (req, res, next) => {
    const t = await sequelize.transaction();

    try {
      const category = await relationalCreate(
        req,
        productCatModel,
        req.body,
        t,
        "cat_id"
      );

      await t.commit();
      res.json({ status: "Success", data: category });
    } catch (error) {
      res.status(422).send({ status: "Error", data: error.message });
      await t.rollback();
      next(error);
    }
  },

  //GET /admin/product/category/:catId(Web)
  categoryFindOne: async (req, res, next) => {
    const { catId } = req.params;
    let options = {
      where: {
        id: catId,
      },
    };

    try {
      const category = await modelService.findOne(productCatModel, options);
      res.json({ status: "Success", data: category });
    } catch (error) {
      error.message = "Get category is not successful: " + error;
      next(error);
    }
  },

  //PUT /admin/product/category/:catId(Web)
  updateCategory: async (req, res, next) => {
    const t = await sequelize.transaction();
    const { catId } = req.params;

    try {
      const category = await relationalUpdate(
        req,
        productCatModel,
        catId,
        req.body,
        t,
        "cat_id"
      );
      await t.commit();
      res.json({ status: "Success", data: category });
    } catch (error) {
      res.status(422).send({ status: "Error", data: error.message });
      await t.rollback();
      next(error);
    }
  },

  //DELETE /categories/:catId(Web)
  deleteCategory: async (req, res, next) => {
    const t = await sequelize.transaction();
    const { catId } = req.params;

    try {
      const deletedCategory = await relationalDelete(
        productCatModel,
        "cat_id",
        catId,
        { transaction: t }
      );

      await t.commit();

      res.json({ status: "Success", data: deletedCategory });
    } catch (error) {
      res.status(422).send({ status: "Error", data: error.message });
      await t.rollback();
      next(error);
    }
  },

  //GET /admin/product/sub-categories(Web)
  subCategoriesFindAll: async (req, res, next) => {
    let page = req.query.page;

    try {
      const subCategories = await paginate(productSubCatModel, {}, page);
      res.json({ status: "Success", data: subCategories });
    } catch (error) {
      error.message = "Get all subcategories is not successful: " + error;
      next(error);
    }
  },

  //GET /product/sub-categories/:catId(Mobile) & /admin/product/sub-categories-cat/:catId
  categorySubCategoriesFindAll: async (req, res, next) => {
    const { catId } = req.params;
    let page = req.query.page;
    let options = {
      where: {
        cat_id: catId,
      },
      include: [{ model: productCatModel }],
    };

    try {
      const categorySubCategories = await paginate(
        productSubCatModel,
        options,
        page
      );

      res.json({ status: "Success", data: categorySubCategories });
    } catch (error) {
      error.message =
        "Get specific category's subcategories is not successful: " + error;
      next(error);
    }
  },

  //POST /admin/product/sub-categories(Web)
  createSubCategory: async (req, res, next) => {
    try {
      const subCategory = await modelService.create(
        productSubCatModel,
        req.body
      );

      res.json({ status: "Success", data: subCategory });
    } catch (error) {
      error.message = "Create subcategory is not successful: " + error;
      next(error);
    }
  },

  //GET /admin/product/sub-categories/:subCatId(Web)
  subCategoryFindOne: async (req, res, next) => {
    const { subCatId } = req.params;

    let option = {
      where: {
        id: subCatId,
      },
    };

    try {
      const subCategory = await modelService.findOne(
        productSubCatModel,
        option
      );

      res.json({ status: "Success", data: subCategory });
    } catch (error) {
      error.message = "Get subcategory is not successful: " + error;
      next(error);
    }
  },

  //PUT /admin/product/sub-categories/:subCatId(Web)
  updateSubCategory: async (req, res, next) => {
    const { subCatId } = req.params;

    let condition = {
      where: {
        id: subCatId,
      },
    };

    try {
      const subCategory = await modelService.update(
        productSubCatModel,
        req.body,
        condition
      );

      res.json({ status: "Success", data: subCategory });
    } catch (error) {
      error.message = "Update subcategory is not successful: " + error;
      next(error);
    }
  },

  //DELETE /admin/product/sub-categories/:subCatId(Web)
  deleteSubCategory: async (req, res, next) => {
    const { subCatId } = req.params;

    let option = {
      where: {
        id: subCatId,
      },
    };

    try {
      const subCategory = await modelService.delete(productSubCatModel, option);

      res.json({ status: "Success", data: subCategory });
    } catch (error) {
      error.message = "Delete subcategory is not successful: " + error;
      next(error);
    }
  },

  //GET /admin/product/products(Web)
  productFindAll: async (req, res, next) => {
    let page = req.query.page;
    let option = {
      include: [{ model: imageModel, attributes: attributes.imageModel }],
    };

    try {
      const products = await paginate(productModel, option, page);

      res.json({ status: "Success", data: products });
    } catch (error) {
      error.message = "Get all products is not successful: " + error;
      next(error);
    }
  },

  //GET /product/products-subcat/:subCatId(Mobile)
  subCategoryProductFindAll: async (req, res, next) => {
    const { subCatId } = req.params;
    let page = req.query.page;
    let options = {
      where: {
        subCat_id: subCatId,
      },
      include: [{ model: imageModel, attributes: attributes.imageModel }],
    };

    try {
      const subCategoryProducts = await paginate(productModel, options, page);

      res.json({ status: "Success", data: subCategoryProducts });
    } catch (error) {
      error.message = "Get subcategory's products is not successful: " + error;
      next(error);
    }
  },

  //GET /product/products-cat/:catId(Mobile)
  categorysProductsFindAll: async (req, res, next) => {
    const { catId } = req.params;
    let page = req.query.page;
    let options = {
      where: {
        cat_id: catId,
      },
      include: [{ model: imageModel, attributes: attributes.imageModel }],
    };

    try {
      const categoryProducts = await paginate(productModel, options, page);

      res.json({ status: "Success", data: categoryProducts });
    } catch (error) {
      error.message = "Get category's products is not successful: " + error;
      next(error);
    }
  },

  //POST /admin/product/products(Web)
  createProduct: async (req, res, next) => {
    const t = await sequelize.transaction();

    try {
      console.log(req.files);
      const product = await relationalCreate(
        req,
        productModel,
        req.body,
        t,
        "product_id"
      );

      await t.commit();

      res.json({ status: "Success", data: product });
    } catch (error) {
      res.status(422).send({ status: "Error", data: error.message });
      await t.rollback();
      next(error);
    }
  },

  //GET /admin/product/products/:productId(Web) & /product/product-detail/:productId
  productFindOne: async (req, res, next) => {
    const { productId } = req.params;

    let options = {
      where: {
        id: productId,
      },
      include: [{ model: imageModel, attributes: attributes.imageModel }],
    };

    try {
      const product = await modelService.findOne(productModel, options);

      res.json({ status: "Success", data: product });
    } catch (error) {
      error.message = "Get product is not successful: " + error;
      next(error);
    }
  },

  //GET /product/new-products
  newProducts: async (req, res, next) => {
    let options = {
      limit: 10,
      order: [["createdAt", "DESC"]],
    };

    try {
      const newProducts = await modelService.findAll(productModel, options);

      res.json({ status: "Success", data: newProducts });
    } catch (error) {
      error.message = "Get new products is not successful: " + error;
      next(error);
    }
  },

  //PUT /admin/product/products/:productId(Web)
  updateProduct: async (req, res, next) => {
    const t = await sequelize.transaction();
    const { productId } = req.params;

    try {
      var product = await relationalUpdate(
        req,
        productModel,
        productId,
        req.body,
        t,
        "product_id"
      );
      await t.commit();
      res.json({ status: "Success", data: product });
    } catch (error) {
      res.status(422).send({ status: "Error", data: error.message });
      await t.rollback();
      next(error);
    }
  },

  //DELETE /admin/product/products/:productId(Web)
  deleteProduct: async (req, res, next) => {
    const t = await sequelize.transaction();
    const { productId } = req.params;

    try {

      const deletedProduct = await relationalDelete(productModel, "product_id", productId, { transaction: t });

      await t.commit();

      res.json({ status: "Success", data: deletedProduct });
    } catch (error) {
      res.status(422).send({ status: "Error", data: error.message });
      await t.rollback();
      next(error);
    }
  },
};
