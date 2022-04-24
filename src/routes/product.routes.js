const { Router } = require("express");
const { createProduct, getAllProducts } = require("../controllers/productController");

const productRouter = Router();

productRouter.get("/", getAllProducts);

productRouter.post("/", createProduct);

module.exports = productRouter;
