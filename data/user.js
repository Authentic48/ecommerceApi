const bcrypt = require('bcryptjs');

const users = [
    {
        name: "Brad",
        email: "Brad@gmail.com",
        password: bcrypt.hashSync("123455"),
        isAdmin: true
    },
    {
        name: "Bob",
        email: "Bob@gmail.com",
        password: bcrypt.hashSync("123455"),
        isAdmin: false,
        isSeller: true
    },
    {
        name: "John",
        email: "John@gmail.com",
        password: bcrypt.hashSync("123455"),
        isAdmin: false,
        isSeller: false
    }
]

module.exports = users