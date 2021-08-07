const Product = require('../Models/productModel')
const asyncHandler = require('express-async-handler')

// @desc   Display all Products
// @route   POST /api/products
// @Access  Public
const getAllProducts = asyncHandler(async (req, res) => {

    const products = await Product.find({})
    return res.status(201).json(products)
})

const createProduct = asyncHandler(async (req, res) => {

    const { name, image, description, brand, category, price, countInStock } = req.body;

    const product = await Product.create({
        name,
        image,
        description,
        brand,
        category,
        price,
        countInStock,
        user: req.user._id
    })

    return res.status(201).json(product)
})
module.exports = { getAllProducts, createProduct }

