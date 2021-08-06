const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')


dotenv.config()

const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
app.use(express.json())

const PORT = process.env.PORT || 5000 


app.listen(PORT, console.log(`App is running in ${process.env.NODE_ENV} on port ${PORT}`.blue.underline))