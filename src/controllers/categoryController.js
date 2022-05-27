import PublicHolidayModel from "../models/PublicHolidayModel.js";
import LeaveModel from "../models/LeaveModel.js";
import EmployeeModel from "../models/EmployeeModel.js";
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

