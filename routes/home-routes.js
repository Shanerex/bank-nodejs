const homeRouter = require('express').Router()

homeRouter.get('/', (req, res) => {
    res.render('index', {home: true, bank: false, admin: false, user: false, account: false})
})

homeRouter.get('/login', (req, res) => {
    res.render('login', {bankLogin: true, userLogin: false})
})

homeRouter.get('/register', (req, res) => {
    res.render('register', {bankRegister: true, userRegister: false})
})

module.exports = homeRouter