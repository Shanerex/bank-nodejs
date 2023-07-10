const asyncHandler = require('express-async-handler')
const { createConnection } = require('../config/db-config')

const getAllAccountsOfUser = asyncHandler(async(userId) => {
    const connection = await createConnection()
    let accounts = []
    try {
        const [rows] = await connection.query('SELECT * FROM account WHERE user_id = ?', [userId])
        accounts = rows.map((row) => ({
            id: row.id,
            balance: row.balance,
            userId: row.user_id,
            bankId: row.bank_id
        }))
    } catch (error) {
        console.log(error);
        throw error
    } finally {
        connection.end()
    }
    console.log(accounts);
    return accounts
})

const getAllAccountsOfBank = asyncHandler(async(bankId) => {
    const connection = await createConnection()
    let accounts = []
    try {
        const [rows] = await connection.query('SELECT * FROM account WHERE bank_id = ?', [bankId])
        accounts = rows.map((row) => ({
            id: row.id,
            balance: row.balance,
            userId: row.user_id,
            bankId: row.bank_id
        }))
    } catch (error) {
        console.log(error);
        throw error
    } finally {
        connection.end()
    }
    console.log(accounts);
    return accounts
})

const getAccountOfUser = asyncHandler(async(accountId, userId) => {
    const connection = await createConnection()
    let account = {}
    try {
        const [rows] = await connection.query('SELECT * FROM account WHERE id = ? AND user_id = ?', [accountId, userId])
        account = rows.map((row) => ({
            id: row.id,
            balance: row.balance,
            userId: row.user_id,
            bankId: row.bank_id
        }))
    } catch (error) {
        console.log(error);
        throw error
    } finally {
        connection.end()
    }
    console.log(account);
    return account
})

const updateBalance = asyncHandler(async(balance, accountId) => {
    const connection = await createConnection()
    try {
        await connection.query('UPDATE account SET balance = ? WHERE id = ?', [balance, accountId])
    } catch (err) {
        console.log(err)
        throw err
    } finally {
        connection.end()
    }
})

const addAccount = asyncHandler(async(balance, userId, bankId) => {
    const connection = await createConnection()
    try {
        await connection.query('INSERT INTO account(balance, user_id, bank_id) VALUES(?,?,?)', [balance, userId, bankId])
    } catch (err) {
        console.log(err)
        throw err
    } finally {
        connection.end()
    }
})

module.exports = {
    getAllAccountsOfUser,
    getAllAccountsOfBank,
    getAccountOfUser,
    updateBalance,
    addAccount
}