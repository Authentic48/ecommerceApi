const express = require('express')
const { getAllProducts, createProduct, updateProduct, getProductById, removeProduct } = require('../Controllers/productController')
const { protect, seller, admin } = require('../Middlewares/authMiddleware')

const router = express.Router()

router.route('/').get(getAllProducts)

router.route('/create').post(protect, seller, createProduct)

router.route('/:id')
    .get(getProductById)
    .put(protect, seller, updateProduct)
    .delete(protect, seller, removeProduct)

module.exports = router;