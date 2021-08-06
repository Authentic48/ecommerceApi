const { registerUser, userAuth } = require('../Controllers/authController')
const express = require('express')

const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(userAuth)


module.exports = router;