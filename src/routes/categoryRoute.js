import { Router } from "express";
import { createCategory, deleteCategory, editCategory, getCategory, getOneCategory } from "../controllers/categoryController.js";

const categoryRouter = Router();

categoryRouter.get("/", getCategory);
categoryRouter.post("/", createCategory);
categoryRouter.get("/search", getOneCategory);
categoryRouter.patch("/:categoryId", editCategory);
categoryRouter.delete("/:categoryId", deleteCategory);



export default categoryRouter;
