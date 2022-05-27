import { errorResponse, okResponse } from "../helpers/response.js";
import CategoryModel from "../models/CategoryModel.js";

export const getCategory = async (req, res) => {
  try {
    const category = await CategoryModel.find();
    okResponse({ status: 200, data: category, res });
  } catch (err) {
    errorResponse({ status: 500, message: err.message, res });
  }
};

export const createCategory = async (req, res) => {
  let { name, quantity } = req.body;

  const categoryModel = new CategoryModel({
    name,
    quantity,
  });
  try {
    const savedCategory = await categoryModel.save();
    okResponse({ status: 200, data: savedCategory, res });
  } catch (error) {
    res.json(error);
  }
};
