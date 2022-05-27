import { errorResponse, okResponse } from "../helpers/response.js";
import ProductModel from "../models/ProductModel.js";

export const addProduct = async (req, res) => {
  try {
    let {
      name,
      image,
      description,
      stockQuantity,
      price,
      category,
      isFeatured,
    } = req.body;

    let productData = await new ProductModel({
      name,
      image,
      description,
      stockQuantity,
      price,
      category,
      isFeatured,
    }).save();
    console.log(productData);
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
    const { pId } = req.params;
    const oneProduct = await ProductModel.find({
      _id: pId,
    });
    if (!oneProduct) {
      return errorResponse(400, "Product List not found", res);
    }
    okResponse({ status: 200, data: oneProduct, res });
  } catch (err) {
    errorResponse({ status: 500, message: err.message, res });
  }
};
