const asyncHandler = require("express-async-handler");
const { getAllTransactionsOfABank, getTransactionsOfAccount, addTransaction } = require("../repository/transaction-repository");
const { updateBalance } = require('../repository/account-repository')

const fetchAllTransactionsOfABank = asyncHandler(async(bankId) => {
    const transactions = await getAllTransactionsOfABank(bankId)

    return transactions
})

const fetchTransactionsOfAccount = asyncHandler(async(accountId) => {
    const transactions = await getTransactionsOfAccount(accountId)

    return transactions
})

const insertTransaction = asyncHandler(async(amount, type, date, account) => {
    await addTransaction(amount, type, date, account.id)
    let updatedBalance
    console.log(typeof(amount));
    console.log(typeof(account.balance));
    if(type === 'WITHDRAW') {
        updatedBalance = Number(account.balance) - Number(amount)
    } else {
        updatedBalance = Number(account.balance) + Number(amount)
    }
    account.balance = updatedBalance
    await updateBalance(updatedBalance, account.id)
})

module.exports = {
    fetchAllTransactionsOfABank,
    fetchTransactionsOfAccount,
    insertTransaction
}