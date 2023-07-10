const adminRouter = require('express').Router()
const transactionController = require('../controller/transaction-controller')
const userController = require('../controller/user-controller')
const accountController = require('../controller/account-controller')


adminRouter.get('/', (req, res) => {
    res.render('index', {home: false, bank: false, admin:true, user: false, account: false})
})
adminRouter.get('/all-transactions', transactionController.getAllTransactionsOfABank)
adminRouter.get('/all-users', userController.getAllUsers)
adminRouter.get('/all-accounts', accountController.getAllAccountsOfBank)

module.exports = adminRouter