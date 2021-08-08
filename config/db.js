const mongoose = require('mongoose')
const colors = require('colors')
const dotenv = require('dotenv')
const asyncHandler = require('express-async-handler')

dotenv.config()

const connectDB = async () => {

    try {
        const connection = await mongoose.connect('mongodb://mongo:27017/ecommerceApi', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log(`mongodb connected on ${connection.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(`Error is comming from mongo connection ${error.message}`.red.bold)
        process.exit(1)

    }
}

module.exports = connectDB 

// 'mongodb://mongo:27017/ecommerceApi'