const asyncHandler = require('express-async-handler')
const { fetchAllAccountsOfUser, fetchAllAccountsOfBank, fetchAccountOfUser, changeBalance, insertAccount } = require('../service/account-service')

const getAllAccountsOfUser = asyncHandler(async (req, res) => {
    try {
        const userId = req.session.user[0].id
        const accounts = await fetchAllAccountsOfUser(userId)
        if (!accounts || accounts.length == 0) {
            throw new Error('No accounts found')
        }

        return res.status(200).json(accounts)
    } catch (error) {
        console.log(error);
        return res.status(404).render('errorpage', {status: 404, error: error.me})
    }
})

const getAllAccountsOfBank = asyncHandler(async(req, res) => {
    try {
        const bankId = req.session.bank[0].id
        const accounts = await fetchAllAccountsOfBank(bankId)
        if (!accounts || accounts.length == 0) {
            throw new Error('No accounts found')
        }

        return res.status(200).json(accounts)
    } catch (error) {
        console.log(error);
        return res.status(404).render('errorpage', {status: 404, error: error.message})
    }
})

const getAccountOfUser = asyncHandler(async(req, res) => {
    const accountId = req.body.id
    const userid = req.session.user[0].id
    try {
        const account = await fetchAccountOfUser(accountId, userid)
        if(!account) {
            throw new Error('No account found')
        }
        req.session.account = account
        return res.status(200).redirect("/transaction")
    } catch (error) {
        console.log(error);
        return res.status(404).render('errorpage', {status: 404, error: error.message})
    }
})

const updateBalance = asyncHandler(async(req, res) => {
    try {
        const accountId = req.query.id
        const amount = req.query.amount //transaction amount
        await changeBalance(balance, accountId)

        return res.status(200).json({status: 200,id: accountId, balance: balance})
    } catch (error) {
        console.log(error);
        return res.status(404).render('errorpage', {status: 404, message: error.message})
    }
})

const addAccount = asyncHandler(async(req, res) => {
    const balance = req.body.balance
    const userId = req.session.user[0].id
    const bankId = req.session.bank[0].id
    try {
        await insertAccount(balance, userId, bankId)

        return res.status(200).render('index', {home: false, bank: false, admin:false, user: false, account: true})
    } catch (error) {
        console.log(error);
        return res.status(404).render('errorpage', {status: 404, message: error.message})
    }
})

module.exports = {
    getAllAccountsOfUser,
    getAllAccountsOfBank,
    getAccountOfUser,
    updateBalance,
    addAccount
}