const express = require('express')
const { getAllProducts, createProduct, updateProduct } = require('../Controllers/productController')
const { protect } = require('../Middlewares/authMiddleware')

const router = express.Router()

router.route('/').get(getAllProducts)

router.route('/create').post(protect, createProduct)

router.route('/:id').put(protect, updateProduct)

module.exports = router;