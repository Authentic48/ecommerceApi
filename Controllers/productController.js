const Product = require('../Models/productModel')
const asyncHandler = require('express-async-handler')

const getAllProducts = asyncHandler(async (req, res) => {

    const products = await Product.find({})
    return res.status(201).json(products)
})

module.exports = { getAllProducts }

