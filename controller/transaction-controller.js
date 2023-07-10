const asyncHandler = require("express-async-handler");
const { fetchAllTransactionsOfABank, fetchTransactionsOfAccount, insertTransaction } = require("../service/transaction-service");

const getAllTransactionsOfABank = asyncHandler(async (req, res) => {
    try {
        console.log(req.session.bank);
        const bankId = req.session.bank[0].id
        const transactions = await fetchAllTransactionsOfABank(bankId)
        if (!transactions || transactions.length == 0) {
            throw new Error('No transactions found')
        }

        return res.status(200).json(transactions)
    } catch (error) {
        console.log(error);
        return res.status(404).render('errorpage', { status: 404, message: error.message })
    }
})

const getTransactionsOfAccount = asyncHandler(async (req, res) => {
    try {
        const accountId = req.session.account[0].id
        const transactions = await fetchTransactionsOfAccount(accountId)
        if (!transactions || transactions.length == 0) {
            throw new Error('No transactions found')
        }

        return res.status(200).json(transactions)
    } catch (error) {
        console.log(error);
        return res.status(404).render('errorpage', { status: 404, message: error.message })
    }
})

const makeTransaction = asyncHandler(async (req, res) => {
    const type = req.params.action
    const amount = req.body.amount
    const account = req.session.account[0]
    try {
        await insertTransaction(amount, type.toUpperCase(), new Date(), account)
        console.log(req.session.account[0]);
        return res.status(200).render('index', { home: false, bank: false, admin: false, user: false, account: false })
    } catch (error) {
        console.log(error);
        return res.status(404).render('errorpage', { status: 404, error: error.message })
    }
})

const getBalance = asyncHandler(async (req, res) => {
    if (req.session.account[0].balance)
        return res.status(200).json({ status: 200, balance: req.session.account[0].balance })

    return res.status(404).render('errorpage', {status: 404, error: 'Balance not found'})
})

module.exports = {
    getAllTransactionsOfABank,
    getTransactionsOfAccount,
    makeTransaction,
    getBalance
}