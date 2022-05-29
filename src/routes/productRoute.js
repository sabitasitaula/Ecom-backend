import { Router } from "express";
import {
  addProduct,
  getAllProducts,
  getOneProducts,
  updateProducts,
  deleteProducts,
} from "../controllers/productController.js";
import { upload } from "../middlewares/fileUpload.js";
const productRouter = Router();
productRouter.route("/").get(getAllProducts);
productRouter.route("/").post(addProduct);
productRouter.route("/:pId").get(getOneProducts);
productRouter.route("/:pId").patch(updateProducts);
productRouter.route("/:pId").delete(deleteProducts);
export default productRouter;
