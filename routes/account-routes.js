const accountRouter = require('express').Router()
const accountController = require('../controller/account-controller')

accountRouter.get('/', (req, res) => {
    res.render('index', {home: false, bank: false, admin: false, user: false, account: true})
})
accountRouter.get('/login-page', (req, res) => {
    res.render('login', {bankLogin: false, userLogin: false})
})
accountRouter.get('/register-page', (req, res) => {
    res.render('register', {bankRegister: false, userRegister: false})
})
accountRouter.get('/user-accounts', accountController.getAllAccountsOfUser)
// accountRouter.get('/accountsbank', accountController.getAllAccountsOfBank)
accountRouter.post('/login', accountController.getAccountOfUser)
// accountRouter.get('/updatebalance', accountController.updateBalance)
accountRouter.post('/register', accountController.addAccount)


module.exports = accountRouter