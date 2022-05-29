import { errorResponse } from "./response.js";
import mongoose from "mongoose";

export const durationValidator = (value) => {
  const reg = new RegExp("^[0-9]*[0-9]$");
  if (!reg.test(value.trim())) return false;
  return true;
};

export const numberValidator = (value) => {
  if (!new RegExp("^[0-9]*[0-9]$").test(value)) return false;
  return true;
};

export const emptyBodyValidator = (body, res) => {
  if (Object.keys(body).length) {
    errorResponse({
      status: 400,
      message: "Bad Request",
      res,
    });
  }
};

export const bodyValidator = (body, res) => {
  if (Object.keys(body).length === 0) {
    return errorResponse({
      status: 400,
      message: "Bad Request",
      res,
    });
  }
};

export const emptyQueryValidator = (query, res) => {
  if (Object.keys(query) != 0) {
    return errorResponse({
      status: 400,
      message: "Bad Request",
      res,
    });
  }
};

export const mongooseIdValidator = (id, res) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return errorResponse({
      status: 400,
      message: " Given Id is not valid!!",
      res,
    });
  }
};

export const isValidDate = (dateString) => {
  if (!new RegExp(/^\d{4}\-\d{1,2}\-\d{1,2}$/).test(dateString)) {
    return false;
  }

  var parts = dateString.split("-");
  var day = parseInt(parts[2], 10);
  var month = parseInt(parts[1], 10);
  var year = parseInt(parts[0], 10);

  if (year < 1000 || year > 3000 || month == 0 || month > 12) {
    return false;
  }

  var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
    monthLength[1] = 29;
  }

  return day > 0 && day <= monthLength[month - 1];
};
