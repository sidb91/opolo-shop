import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";


connectDB(); //Connect to Mongo DB

const port = process.env.port || 5000;
const app = express();

//cookie parser middleware - allow to access request.cookies
app.use(cookieParser());

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.send("api is running...");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) => {
  res.send({
    clientId: process.env.PAYPAL_CLIENT_ID
  })
})

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server runnning on port ${port} `);
});
