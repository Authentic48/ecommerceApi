const Product = require('../Models/productModel')
const asyncHandler = require('express-async-handler')

// @desc   Display all Products
// @route   GET /api/products
// @Access  Public
const getAllProducts = asyncHandler(async (req, res) => {

    const products = await Product.find({})
    return res.status(201).json(products)
})

// @desc   Create a Product
// @route   POST /api/products/create
// @Access  Private / Seller
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


// @desc   Update a Product
// @route   PUT /api/products/:id
// @Access  Private / Seller
const updateProduct = asyncHandler(async (req, res) => {

    const { name, image, description, brand, category, price, countInStock } = req.body;
    const product = await Product.findById(req.params.id)

    if (product) {
        product.name = name || product.name
        product.image = image || product.image
        product.description = description || product.description
        product.brand = description || product.brand
        product.category = category || product.category
        product.price = price || product.price
        product.countInStock = countInStock || product.countInStock

        const updatedProduct = await product.save();
        res.json(updatedProduct)

    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }
})

// @desc   Get a Product
// @route   GET /api/products/:id
// @Access  Public
const getProductById = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id)
    
    if(product)
    {
        return res.status(201).json(product)
    }else{
        res.status(404)
        throw new error('Product not Found')
    }

})
module.exports = { getAllProducts, createProduct, updateProduct, getProductById }

