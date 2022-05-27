import express from "express";
import database from "./config/config.js";
import "dotenv/config";
import categoryRouter from "./routes/categoryRoute.js";

const app = express();
database();

const apiRoute = Router();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from my-express-app!" });
});

apiRoute
  .use("/category", categoryRouter);


app.use("/api", apiRoute);

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
