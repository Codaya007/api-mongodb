const { Router } = require("express");
const { createCategory, getAllCategories } = require("../controllers/categoryController");

const categoryRouter = Router();

categoryRouter.get("/", getAllCategories);

categoryRouter.post("/", createCategory);

module.exports = categoryRouter;
