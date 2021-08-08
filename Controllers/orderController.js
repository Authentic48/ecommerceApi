const express = require('express')
const asyncHandler = require('express-async-handler')
const Product = require('../Models/productModel')
const Order = require('../Models/orderModel')

// @desc Create Order Controller
// @route api/orders/create
// @Access  Private
const createOrder = asyncHandler(async (req, res) => {

    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    console.log(`${orderItems}`);
    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('Oops you forgot to select a product')
        return;
    } else {
        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
})

// @desc Create Order Controller
// @route api/orders/create
// @Access  Private 


module.exports = { createOrder }