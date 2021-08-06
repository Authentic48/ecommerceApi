const User = require('../Models/userModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs');
const generateWebToken = require('../utility/generateWebToken')


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
                token: generateWebToken(user.id),
            })
        } else {
            return res.json('Invalid password')
        }
    }

})

module.exports = { registerUser, userAuth }