const User = require('../Models/userModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs');
const generateWebToken = require('../utility/generateWebToken')


// @desc   Auth user & get Token
// @route   POST /api/users/register
// @Access  Public
const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email })

    if (userExist) {
        res.status(400)
        throw new Error("User's already exist")
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            id: user._id,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin,
            token: generateWebToken(user.id),
        })
    } else {
        res.status(400)
        throw new Error('Incorrect Data')
    }

})

// @desc   register new user 
// @route   GET /api/users/login
// @Access  Public 
const userAuth = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email })
    if (user) {
        const validPassword = await bcrypt.compare(password, user.password)

        if (validPassword) {
            return res.json({
                id: user.id,
                email: user.email,
                name: user.name,
                isAdmin: user.isAdmin,
                isSeller: user.isSeller,
                token: generateWebToken(user.id),
            })
        } else {
            return res.json('Invalid password')
        }
    }else{
        return res.status(201).json('Incorrect credentials....')
    }

})

// @desc    Get all Users
// @route   GET /api/users
// @access  Private / Admin
const getUsers = asyncHandler(async (req, res) => {

    const users = await User.find({})

    return res.status(201).json(users)
})


// @desc   register new user 
// @route   GET /api/users/profile
// @Access  Private
const getUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)
    if (user) {
        res.json({
            id: user._id,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin,
            isSeller: user.isSeller,
        })

    } else {
        res.status(404)
        throw new Error('User not found')
    }

})

// @desc   register new user 
//@route   GET /api/users/profile
//@Access  Private
const updateUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if (req.body.password) {
            user.password = req.body.password
        }
        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            isSeller: updatedUser.isSeller,
            token: generateWebToken(updatedUser._id),
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        await user.remove()
        res.json({ message: "user has Been deleted" })

    } else {
        res.status(404)
        res.json({ message: "User Not Found" })
    }
})

// @desc    Get User By id
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')

    if (user) {
        res.json(user)
    } else {
        res.status(404)
        res.json({ message: "User Not Found" })
    }
})

// @desc    Admin Updates user 
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUserByAdmin = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin || user.isAdmin,
        user.isSeller = req.body.isSeller || user.isSeller

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            isSeller: updatedUser.isSeller,
            token: generateWebToken(updatedUser._id),
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


module.exports = { registerUser, userAuth, getUsers, updateUser, getUserProfile, updateUserByAdmin, getUserById, deleteUser }