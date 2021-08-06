const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')

const connectDB = require('./config/db')
const authRoute = require('./Routes/authRoute')

// DB Connection 
connectDB()

dotenv.config()

const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/users', authRoute)

const PORT = process.env.PORT || 5000 


app.listen(PORT, console.log(`App is running in ${process.env.NODE_ENV} on port ${PORT}`.blue.underline))