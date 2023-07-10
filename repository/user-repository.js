const asyncHandler = require('express-async-handler')
const { createConnection } = require('../config/db-config')

const getAllUsers = asyncHandler(async () => {
    const connection = await createConnection()
    let users = []
    try {
        const [rows] = await connection.query('SELECT * FROM user')
        users = rows.map((row) => ({
            id: row.id,
            firstName: row.first_name,
            lastName: row.last_name,
            email: row.email
        }))
    } catch (error) {
        console.log(error);
        throw error
    } finally {
        connection.end()
    }

    return users
})

const getUserByEmail = asyncHandler(async (email) => {
    const connection = await createConnection()
    let user = {}
    try {
        const [entry] = await connection.query('SELECT * FROM user WHERE email = ?', [email])
        user = entry.map((row) => ({
            id: row.id,
            firstName: row.first_name,
            lastName: row.last_name,
            email: row.email
        }))
    } catch (err) {
        console.log(err)
    } finally {
        connection.end()
    }
    console.log(user);
    return user
})

const addUser = asyncHandler(async(firstName, lastName, email) => {
    const connection = await createConnection()
    try {
        await connection.query('INSERT INTO user(first_name, last_name, email) VALUES(?,?,?)', [firstName, lastName, email])
    } catch (err) {
        console.log(err)
        throw err
    } finally {
        connection.end()
    }
})

module.exports = {
    getAllUsers,
    getUserByEmail,
    addUser
}