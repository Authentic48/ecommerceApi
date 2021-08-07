const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const connectDB = require('./config/db')
const authRoute = require('./Routes/authRoute')
const productRoute = require('./Routes/productRoute')
const orderRoute = require('./Routes/orderRoute')

const { errorHandler, notFound } = require('./Middlewares/errorMiddleware')


// DB Connection 
connectDB()

dotenv.config()

const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
app.use(express.json())

//Routes
app.use('/api/users', authRoute)
app.use('/api/products', productRoute)
app.use('/api/orders', orderRoute)


// Error Middlewares
app.use(errorHandler)
app.use(notFound)


const PORT = process.env.PORT || 5000 


app.listen(PORT, console.log(`App is running in ${process.env.NODE_ENV} on port ${PORT}`.blue.underline))