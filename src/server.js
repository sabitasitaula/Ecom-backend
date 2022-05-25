import express from "express";
import database from "./config/config.js";
import "dotenv/config";

const app = express();
database();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from my-express-app!" });
});

console.log("Hello world");

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
