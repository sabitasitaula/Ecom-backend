import { errorResponse, okResponse } from "../helpers/response.js";
import ProductModel from "../models/ProductModel.js";
import CategoryModel from "../models/CategoryModel.js";
import {
  emptyBodyValidator,
  emptyQueryValidator,
} from "../helpers/validator.js";
export const addProduct = async (req, res) => {
  try {
    emptyQueryValidator(req.query, res);
    bodyValidator(req.body, res);
    let category = await CategoryModel.findOne({ id: req.body.category });
    let { name, image, description, stockQuantity, price, isFeatured } =
      req.body;

    let productData = await new ProductModel({
      name,
      image,
      description,
      stockQuantity,
      price,
      category: category._id,
      isFeatured,
    }).save();

    if (!productData) {
      return errorResponse(400, "Product page cannot be created", res);
    }
    okResponse({ status: 200, data: productData, res });
  } catch (err) {
    errorResponse({ status: 500, message: err.message, res });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    emptyBodyValidator(req.body, res);
    emptyQueryValidator(req.query, res);
    const allProduct = await ProductModel.find();
    if (!allProduct) {
      return errorResponse(400, "Cannot get all Product List", res);
    }
    okResponse({ status: 200, data: allProduct, res });
  } catch (err) {
    errorResponse({ status: 500, message: err.message, res });
  }
};
export const getOneProducts = async (req, res) => {
  try {
    emptyBodyValidator(req.body, res);
    emptyQueryValidator(req.query, res);
    const { pId } = req.params;
    const oneProduct = await ProductModel.find({
      _id: pId,
    });
    if (!oneProduct) {
      return errorResponse(400, "Product List not found", res);
    }
    const productDetails = oneProduct.map((obj) => ({
      productId: obj._id,
      productName: obj.name,
      productImage: obj.image,
      productDescription: obj.description,
      productQuantity: obj.stockQuantity,
      productPrice: obj.price,
      Category: obj.category,
    }));
    okResponse({ status: 200, data: productDetails, res });
  } catch (err) {
    errorResponse({ status: 500, message: err.message, res });
  }
};
