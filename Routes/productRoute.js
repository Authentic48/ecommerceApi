const express = require('express')
const { getAllProducts } = require('../Controllers/productController')
const { protect } = require('../Middlewares/authMiddleware')

const router = express.Router()

router.route('/').get(getAllProducts)


module.exports = router;