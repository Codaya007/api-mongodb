const Category = require("../models/Category");

const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    const category = new Category({ name });
    await category.save();

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      results: category,
    });
  } catch (error) {
    next(error);
  }
};

const getAllCategories = async (req, res, next) => {
  try {
    const results = await Category.find({});

    res.json({ success: true, results });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCategory,
  getAllCategories,
};
