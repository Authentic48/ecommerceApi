
const jwt = require('jsonwebtoken')


const generateWebToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}

module.exports = generateWebToken