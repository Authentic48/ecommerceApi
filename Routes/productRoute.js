const express = require('express')
const { getAllProducts, createProduct } = require('../Controllers/productController')
const { protect } = require('../Middlewares/authMiddleware')

const router = express.Router()

router.route('/').get(getAllProducts)

router.route('/create').post(protect, createProduct)
module.exports = router;