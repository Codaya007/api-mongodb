const Product = require("../models/Product");

const createProduct = async (req, res, next) => {
  const { name, description, price, quantity } = req.body;

  if (!name || !description || !price || !quantity) {
    return next({
      status: 400,
      message: "name, description, price and quantity fields are required",
    });
  }

  try {
    const product = new Product({
      name,
      description,
      price,
      quantity,
    });

    // Guardamos el nuevo producto en la DDBB
    await product.save();

    res.status(201).json({
      success: true,
      message: "Product Created Successfully",
      product,
    });
  } catch (err) {
    next(err);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const results = await Product.find({});

    res.json({ success: true, count: results.length, results });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
};
