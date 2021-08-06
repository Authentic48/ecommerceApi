const { registerUser, userAuth, getUsers } = require('../Controllers/authController')
const express = require('express')
const { protect } = require('../Middlewares/authMiddleware')

const router = express.Router()

router.route('/register').post(registerUser)

router.route('/login').post(userAuth)

router.route('/').get(protect, getUsers)



module.exports = router;