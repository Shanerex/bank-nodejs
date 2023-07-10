const express = require('express')

const bankRouter = express.Router()

const bankController = require('../controller/bank-controller')

bankRouter.get('/', (req, res) => {
    res.render('index', {home: false, bank: true, admin:false, user: false, account: false})
})
// bankRouter.get('/all-banks', bankController.getBanks)
bankRouter.post('/register', bankController.addBankByBankName)
bankRouter.post('/login', bankController.getBankById)


module.exports = bankRouter