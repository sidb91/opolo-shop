import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../model/productModel.js";

//@desc Fetch All Products
//@routes GET /api/products
//@access Public
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

//@desc Fetch Single Product
//@routes GET /api/products/:id
//@access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getAllProducts, getProductById };
