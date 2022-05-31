import express from "express";
import database from "./config/config.js";
import "dotenv/config";
import path from "path";
import { Router } from "express";
import productRouter from "./routes/productRoute.js";
import categoryRouter from "./routes/categoryRoute.js";
import { fileURLToPath } from "url";
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
database();

const apiRoute = Router();
app.use(express.json());
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from my-express-app!" });
});

apiRoute.use("/product", productRouter);
apiRoute.use("/category", categoryRouter);

app.use("/api", apiRoute);

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
