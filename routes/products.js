const express = require('express');
const router = express.Router();
const ProductsController = require('../app/Controllers/ProductsController');

// products
router.post('/store', ProductsController.productStore);
router.get('/list', ProductsController.productsLists);
router.get('/:id', ProductsController.getProductById);
router.delete('/:id', ProductsController.deleteProduct);

module.exports = router;