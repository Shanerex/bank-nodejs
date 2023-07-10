const asyncHandler = require('express-async-handler')
const { getAllAccountsOfUser, getAllAccountsOfBank, getAccountOfUser, updateBalance, addAccount } = require('../repository/account-repository')

const fetchAllAccountsOfUser = asyncHandler(async(userId) => {
    const accounts = await getAllAccountsOfUser(userId)
    if(!accounts || accounts.length == 0) {
        throw new Error('No accounts found')
    }
    console.log(accounts);
    return accounts
})

const fetchAllAccountsOfBank = asyncHandler(async(bankId) => {
    const accounts = await getAllAccountsOfBank(bankId)
    if(!accounts || accounts.length == 0) {
        throw new Error('No accounts found')
    }
    console.log(accounts);
    return accounts
})

const fetchAccountOfUser = asyncHandler(async(accountId, userId) => {
    const account = await getAccountOfUser(accountId, userId)
    if(!account || account.length != 1) {
        throw new Error('No account found')
    }

    return account
})

const changeBalance = asyncHandler(async(balance, accountId) => {
    try {
        await updateBalance(balance, accountId)
    } catch (error) {
        throw error
    }
})

const insertAccount = asyncHandler(async(balance, userId, bankId) => {
    await addAccount(balance, userId, bankId)
})

module.exports = {
    fetchAllAccountsOfUser,
    fetchAllAccountsOfBank,
    fetchAccountOfUser,
    changeBalance,
    insertAccount
}