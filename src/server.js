import express from "express";
import database from "./config/config.js";
import "dotenv/config";
import categoryRouter from "./routes/categoryRoute.js";
import { Router } from "express";

const app = express();
database();

const apiRoute = Router();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({ message: "Hello from my-express-app!" });
});

apiRoute
  .use("/category", categoryRouter);


app.use("/api", apiRoute);
app.use("/*", (req, res) => {
  res.status(404).send({ message: "error" });
})

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
