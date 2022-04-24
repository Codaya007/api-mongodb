const Subcategory = require("../models/Subcategory");
const { ObjectId } = require("mongoose").Types;

const createSubcategory = async (req, res, next) => {
  const { name, category } = req.body;

  try {
    const subcategory = new Subcategory({ name, category });

    await subcategory.save();

    res.status(201).json({
      success: true,
      message: "Subcategory created successfully",
      results: subcategory,
    });
  } catch (error) {
    next(error);
  }
};

const getAllSubcategories = async (req, res, next) => {
  try {
    const { category } = req.query;
    if (category && !ObjectId.isValid(category))
      return next({
        status: 400,
        message: "Category query contains a invalid ObjectId",
      });
    const where = {};

    if (category && ObjectId.isValid(category)) where.category = category;

    const results = await Subcategory.find(where);

    res.json({ success: true, results });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSubcategory,
  getAllSubcategories,
};
