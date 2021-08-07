const { registerUser, userAuth, getUsers, updateUser, getUserProfile, updateUserByAdmin, getUserById, deleteUser } = require('../Controllers/authController')
const express = require('express')
const { protect } = require('../Middlewares/authMiddleware')

const router = express.Router()

router.route('/register').post(registerUser)

router.route('/login').post(userAuth)

router.route('/').get(protect, getUsers)

router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUser)

router.route('/id')
    .get(protect, getUserById)
    .put(protect, updateUserByAdmin)
    .delete(protect, deleteUser)


module.exports = router;