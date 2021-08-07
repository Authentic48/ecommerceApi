const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../Models/userModel.js')

// @desc This middleware check login user 
const protect = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id)

            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

// @des this middleware check admin
const admin = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error('Not authorized as an admin')
    }
})

// @des this middleware check seller
const seller = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.isSeller) {
        next()
    } else {
        res.status(401)
        throw new Error('Not authorized as an seller')
    }
})

module.exports = { protect, seller, admin }