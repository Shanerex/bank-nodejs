const asyncHandler = require('express-async-handler')
const { createConnection } = require('../config/db-config')

const getAllBanks = asyncHandler(async () => {
    // console.log('in repo');
    const connection = await createConnection()

    let banks = []
    try {
        const [rows] = await connection.query('SELECT * FROM bank')
        banks = rows.map((row) => ({
            id: row.id,
            name: row.name
        }))
    } catch (err) {
        console.log(err)
        throw err
    } finally {
        connection.end()
    }
    return banks
})

const insertBank = asyncHandler(async (bankName) => {
    const connection = await createConnection()
    try {
        await connection.query('INSERT INTO bank(name) VALUES(?)', [bankName])
    } catch (err) {
        console.log(err)
        throw err
    } finally {
        connection.end()
    }
})

const getBankById = asyncHandler(async (id) => {
    const connection = await createConnection()
    let bank = {}
    try {
        const [entry] = await connection.query('SELECT * FROM bank WHERE id = ?', [id])
        bank = entry.map((row) => ({
            id: row.id,
            name: row.name
        }))
    } catch (err) {
        console.log(err)
    } finally {
        connection.end()
    }
    // console.log(bank);
    return bank
})


module.exports = {
    getAllBanks,
    insertBank,
    getBankById
}