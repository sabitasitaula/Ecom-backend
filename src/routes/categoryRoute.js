import { Router } from "express";
import { createCategory, getCategory } from "../controllers/categoryController.js";

const categoryRouter = Router();

categoryRouter.get("/", getCategory);
categoryRouter.post("/",createCategory)

export default categoryRouter;
