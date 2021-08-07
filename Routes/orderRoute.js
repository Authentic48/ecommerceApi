const express = require('express')
const {  createOrder } = require('../Controllers/orderController')
const { protect, seller, admin } = require('../Middlewares/authMiddleware')

const router = express.Router()


router.route('/create').post(protect, createOrder)



module.exports = router;