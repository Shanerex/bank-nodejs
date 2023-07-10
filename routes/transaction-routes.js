const transactionRouter = require('express').Router()
const transactionController = require('../controller/transaction-controller')


// transactionRouter.get('/alltransactions', transactionController.getAllTransactionsOfABank)
transactionRouter.get('/', (req, res) => {
    res.render('index', {home: false, bank: false, admin: false, user: false, account: false})
})
transactionRouter.get('/withdraw', (req, res) => {
    res.render('transaction', {withdraw: true})
})
transactionRouter.get('/deposit', (req, res) => {
    res.render('transaction', {withdraw: false})
})
transactionRouter.get('/account-transactions', transactionController.getTransactionsOfAccount)
transactionRouter.get('/balance', transactionController.getBalance)
transactionRouter.post('/:action', transactionController.makeTransaction)
//left out features: 1. creating transaction record 2. updating account balance

module.exports = transactionRouter