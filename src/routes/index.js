const { Router } = require('express');
const productRouter = require('./product.routes')

const router = Router();

// Configurar los routers
router.use('/product', productRouter);

module.exports = router;
