const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({

    name:{
        type: String,
        required : true
    },
    email:{
        type: String,
        required : true,
        unique: true,
    },
    password:{
        type: String,
        required : true,
    },
    isAdmin:{
        type: Boolean,
        required : true,
        default: false
    },
}, {
    timestamps: true
})

const user = mongoose.model('User', userSchema)

module.exports = user