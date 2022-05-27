import { Router } from "express";

const categoryRouter = Router();

categoryRouter.get("/", getCategory);

export default categoryRouter;
