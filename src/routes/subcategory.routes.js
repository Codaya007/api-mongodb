const { Router } = require("express");
const { createSubcategory, getAllSubcategories } = require("../controllers/subcategoryController");

const subcategoryRouter = Router();

subcategoryRouter.get("/", getAllSubcategories);

subcategoryRouter.post("/", createSubcategory);

module.exports = subcategoryRouter;
