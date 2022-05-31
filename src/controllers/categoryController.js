import mongoose from "mongoose";
import { errorResponse, okResponse } from "../helpers/response.js";
import {
  bodyValidator,
  emptyBodyValidator,
  emptyQueryValidator,
} from "../helpers/validator.js";
import CategoryModel from "../models/CategoryModel.js";
import ProductModel from "../models/ProductModel.js";

export const getCategory = async (req, res) => {
  try {
    emptyQueryValidator(req.query, res);
    emptyBodyValidator(req.body, res);

    const category = await CategoryModel.find({ isDeleted: false });

    const categoryData = category.map((obj) => ({
      categoryId: obj._id,
      categoryName: obj.name,
      dataQuantity: obj.quantity,
    }));
    okResponse({ status: 200, data: categoryData, res });
  } catch (err) {
    errorResponse({ status: 500, message: err.message, res });
  }
};

export const createCategory = async (req, res) => {
  bodyValidator(req.body, res);
  if (Object.keys(req.query).length != 0) {
    return errorResponse({
      status: 404,
      message: "Page with given query not found",
      res,
    });
  }

  let { name, quantity } = req.body;

  const categoryModel = new CategoryModel({
    name,
    quantity,
  });
  
  try {
    const savedCategory = await categoryModel.save();
    okResponse({ status: 200, data: savedCategory, res });
  } catch (err) {
    errorResponse({ status: 500, message: err.message, res });
  }
};

export const getOneCategory = async (req, res) => {
  emptyBodyValidator(req.body, res);
  try {
    const { name } = req.query;
    const category = await CategoryModel.find({
      name: {
        $in: new RegExp(name, "i"),
      },
    });
    if (category.length === 0) {
      return errorResponse({
        status: 404,
        message: "No data in this category",
        res,
      });
    }
    const categoryData = category.map((obj) => ({
      categoryId: obj._id,
      categoryName: obj.name,
      dataQuantity: obj.quantity,
    }));
    okResponse({ status: 200, data: categoryData, res });
  } catch (err) {
    errorResponse({ status: 500, message: err.message, res });
  }
};

export const editCategory = async (req, res) => {
  bodyValidator(req.body, res);
  emptyQueryValidator(req.query, res);
  try {
    let { categoryId } = req.params;
    let { name, quantity } = req.body;
    let category = {
      name,
      quantity,
    };
    let categoryEdit = await CategoryModel.findByIdAndUpdate(
      { _id: categoryId },
      category
    );
    okResponse({ status: 200, data: categoryEdit, res });
  } catch (err) {
    errorResponse({ status: 500, message: err.message, res });
  }
};

export const deleteCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const categoryfind = await CategoryModel.findOne({
      $and: [{ isDeleted: false }, { _id: categoryId }],
    });

    if (categoryfind) {
      const category = await categoryfind.updateOne({ isDeleted: true });
      if (!category) {
        errorResponse({
          status: 401,
          message: "Error in category deletion",
          res,
        });
      } else {
        const product = await ProductModel.updateMany(
          { category: categoryfind._id },
          { isDeleted: true }
        );
        if (product) {
          res.status(200).json({ success: true, message: "category deleted" });
        }
      }
    } else if (!categoryfind || categoryfind.length === null) {
      errorResponse({
        status: 401,
        message: "Invalid category Id",
        res,
      });
    }

  } catch (err) {
    errorResponse({ status: 500, message: err.message, res });
  }
};
