import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"

dotenv.config();

connectDB(); //Connect to Mongo DB

const port = process.env.port || 5000;
const app = express();

app.get("/", (req, res) => {
  res.send("api is running...");
});

app.use("/api/products", productRoutes)

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server runnning on port ${port} `);
});
