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
    // bodyValidator(req.body, res);
    let category = await CategoryModel.findOne({ id: req.body.category });
    let { name, description, stockQuantity, price, isFeatured } = req.body;
    const fileName = req.file.filename;
    const filePath = `/public/uploads/`;
    let productData = await new ProductModel({
      name,
      image: `${filePath}${fileName}`,
      description,
      stockQuantity,
      price,
      category: category._id,
      isFeatured,
    }).save();

    if (productData) {
      const count = category.quantity + 1;
      const categoryCount = await CategoryModel.findByIdAndUpdate(
        { _id: category._id },
        {
          quantity: count,
        }
      );
      if (!categoryCount) {
        return errorResponse(400, "Category cannot be updated", res);
      }
      res.status(200).json({ success: true, data: data });
    }
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
    const allProduct = await ProductModel.find({ isDeleted: false })
      .select("-isDeleted")
      .populate("category", "name");
    if (!allProduct) {
      return errorResponse(400, "Cannot get all Product List", res);
    }
    const productDetails = allProduct.map((obj) => ({
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
export const getOneProducts = async (req, res) => {
  try {
    emptyBodyValidator(req.body, res);
    emptyQueryValidator(req.query, res);
    const { pId } = req.params;
    const oneProduct = await ProductModel.find({
      $and: [{ _id: pId }, { isDeleted: false }],
    })
      .select("-isDeleted")
      .populate("category", "name");
    if (oneProduct.length === 0) {
      return errorResponse({
        status: 404,
        message: "Product results not found",
        res,
      });
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

export const updateProducts = async (req, res) => {
  try {
    let {
      productName: name,
      productDescription: description,
      productQuantity: stockQuantity,
      productPrice: price,
      isFeatured,
    } = req.body;

    let product = {
      name,
      description,
      stockQuantity,
      price,
      isFeatured,
    };
    const { pId } = req.params;
    let productdata = await ProductModel.findOneAndUpdate(
      { _id: pId },
      product,
      { new: true }
    );
    if (productdata.length === 0) {
      return errorResponse({
        status: 404,
        message: "Cannot update data.",
        res,
      });
    }
    okResponse({ status: 200, data: productdata, res });
  } catch (err) {
    errorResponse({ status: 500, message: err.message, res });
  }
};

export const deleteProducts = async (req, res) => {
  try {
    const { pId } = req.params;
    const productFind = await ProductModel.findOne({
      $and: [{ isDeleted: false }, { _id: pId }],
    });
    if (productFind) {
      const product = await productFind.updateOne({ isDeleted: true });
      if (!product) {
        return errorResponse({
          status: 401,
          message: "Error in product insertion",
          res,
        });
      } else {
        const category = await CategoryModel.findOneAndUpdate(
          { _id: productFind.category },
          { quantity: quantity - 1 }
        );

        if (category) {
          okResponse({
            status: 200,
            data: "Product Deleted Successfully",
            res,
          });
        }
      }
    } else if (!productFind || productFind.length === null) {
      return errorResponse({
        status: 404,
        message: "Product ID not found",
        res,
      });
    }
  } catch (err) {
    errorResponse({ status: 500, message: err.message, res });
  }
};
