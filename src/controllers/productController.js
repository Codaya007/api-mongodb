const Product = require("../models/Product");
const Subcategory = require("../models/Subcategory");
const { ObjectId } = require("mongoose").Types;

const createProduct = async (req, res, next) => {
  const { name, description, price, quantity, subcategory, gender = "U" } = req.body;

  if (!name || !description || !price || !quantity || !subcategory) {
    return next({
      status: 400,
      message:
        "Name, description, price, subcategory and quantity fields are required",
    });
  }

  try {
    const subcategoryObj = await Subcategory.findOne({ _id: subcategory });

    if (!subcategoryObj)
      return next({ status: 404, message: "Subcategory not found" });

    const product = new Product({
      name,
      description,
      price,
      quantity,
      subcategory,
      category: subcategoryObj.category,
      gender
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
    const { category, subcategory, gender } = req.query;
    if (
      (category && !ObjectId.isValid(category)) ||
      (subcategory && !ObjectId.isValid(subcategory))
    )
      return next({
        status: 400,
        message: "Category/subcategory query contains a invalid ObjectId",
      });

    const where = {};
    if (category) where.category = category;
    if (subcategory) where.subcategory = subcategory;
    if (gender) where.gender = gender;

    const results = await Product.find(where);

    res.json({ success: true, count: results.length, results });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
};
