import { Router } from "express";
import {
  addProduct,
  getAllProducts,
  getOneProducts,
} from "../controllers/productController.js";

const productRouter = Router();
productRouter.route("/").get(getAllProducts);
productRouter.route("/").post(addProduct);
productRouter.route("/:pId").get(getOneProducts);

export default productRouter;
