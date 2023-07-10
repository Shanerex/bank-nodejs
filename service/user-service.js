const { getAllUsers, getUserByEmail, addUser } = require('../repository/user-repository')
const asyncHandler = require('express-async-handler')

const fetchAllUsers = asyncHandler(async () => {
    const users = await getAllUsers()
    if (!users || users.length == 0) {
        throw new Error('No users found')
    }

    return users
})

const fetchUserByEmail = asyncHandler(async (email) => {
    const user = await getUserByEmail(email)
    if (!user || user.length != 1) {
        throw new Error('No user with provided email found')
    }

    return user
})

const insertUser = asyncHandler(async(firstName, lastName, email) => {
    try {
        await addUser(firstName, lastName, email)
    } catch (error) {
        throw error
    }
})

module.exports = {
    fetchAllUsers,
    fetchUserByEmail,
    insertUser
}