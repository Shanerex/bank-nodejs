const userRouter = require('express').Router()
const userController = require('../controller/user-controller')


userRouter.get('/', (req, res) => {
    res.render('index', {home: false, bank: false, admin: false, user: true, account: false})
})
userRouter.get('/login-page', (req, res) => {
    res.render('login', {bankLogin: false, userLogin: true})
})
userRouter.get('/register-page', (req, res) => {
    res.render('register', {bankRegister: false, userRegister: true})
})
// userRouter.get('/allusers', userController.getAllUsers)
userRouter.post('/login', userController.getUserByEmail)
userRouter.post('/register', userController.addUser)

module.exports = userRouter