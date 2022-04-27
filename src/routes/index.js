const { Router } = require("express");
const productRouter = require("./product.routes");
const categoryRouter = require("./category.routes");
const subcategoryRouter = require("./subcategory.routes");
const authRouter = require("./auth.routes");

const router = Router();

// Configurar los routers
router.use("/auth", authRouter);
router.use("/product", productRouter);
router.use("/category", categoryRouter);
router.use("/subcategory", subcategoryRouter);

module.exports = router;
