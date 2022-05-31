import { Router } from "express";
import {
  addProduct,
  getAllProducts,
  getOneProducts,
  updateProducts,
  deleteProducts,
  getAllCategoryProduct,
} from "../controllers/productController.js";
import { upload } from "../middlewares/fileUpload.js";
const productRouter = Router();
productRouter.route("/").get(getAllProducts);
// productRouter.route("/", upload.image.single("image").post(addProduct));
productRouter.post("/", upload.image.single("image"), addProduct);
productRouter.route("/:pId").get(getOneProducts);
productRouter.route("/category/:pId").get(getAllCategoryProduct);
productRouter.route("/:pId").patch(updateProducts);
productRouter.route("/:pId").delete(deleteProducts);
export default productRouter;
