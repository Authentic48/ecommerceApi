const users = require('./data/user')
const User = require('./Models/userModel')
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
const dotenv = require('dotenv')
const colors = require('colors')
const connectDB = require('./config/db.js')

dotenv.config()

connectDB()

const importDataToDb = asyncHandler(async () => {

    try {
        await User.deleteMany();

        const createdUser = await User.insertMany(users)
        console.log(`Data imported To db`.green.inverse)
        process.exit()
    } catch (error) {
        console.log(`Error is coming from Importing the data to the db ${error.message}`.red.inverse);
        process.exit(1)
    }
})


const destroyDataFromDb = async () => {
    try {
        await User.deleteMany();

        console.log('Data destroy from db'.blue.inverse)
        process.exit()
    } catch (error) {
        console.log(`Error is coming from Destroing the data to the db ${error.message}`.red.inverse);
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyDataFromDb();
} else {
    importDataToDb();
}