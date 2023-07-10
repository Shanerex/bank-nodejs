const asyncHandler = require("express-async-handler");
const { createConnection } = require("../config/db-config");

const getAllTransactionsOfABank = asyncHandler(async(bankId) => {
    const connection = await createConnection()
    let transactions = []
    try {
        const [rows] = await connection.query('SELECT transaction.id, transaction.amount, transaction.type, transaction.date, transaction.account_id  FROM account RIGHT JOIN transaction ON account.id = transaction.account_id LEFT JOIN bank on account.bank_id = bank.id WHERE bank.id=?', [bankId])
        transactions = rows.map((row) => ({
            id: row.id,
            amount: row.amount,
            type: row.type,
            date : row.date,
            accountId : row.account_id
        }))
    } catch (error) {
        console.log(error);
        throw error
    } finally {
        connection.end()
    }

    console.log(transactions);
    return transactions
})

const getTransactionsOfAccount = asyncHandler(async(accountId) => {
    const connection = await createConnection()
    let transactions = []
    try {
        const [rows] = await connection.query('SELECT * FROM transaction WHERE account_id = ?', [accountId])
        transactions = rows.map((row) => ({
            id: row.id,
            amount: row.amount,
            type: row.type,
            date : row.date,
            accountId : row.account_id
        }))
    } catch (error) {
        console.log(error);
        throw error
    } finally {
        connection.end()
    }

    console.log(transactions);
    return transactions
})

const addTransaction = asyncHandler(async(amount, type, date, accid) => {
    const connection = await createConnection()
    try {
        await connection.query('INSERT IGNORE INTO transaction(amount, type, date, account_id) VALUES(?,?,?,?)', [amount, type, date, accid])
    } catch (error) {
        console.log(error);
        throw error
    } finally {
        connection.end()
    }
})

module.exports = {
    getAllTransactionsOfABank,
    getTransactionsOfAccount,
    addTransaction
}