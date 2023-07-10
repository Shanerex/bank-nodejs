const { fetchAllUsers, fetchUserByEmail, insertUser } = require('../service/user-service')
const asyncHandler = require('express-async-handler')

const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const users = await fetchAllUsers()
        if (!users || users.length == 0) {
            throw new Error('No users found')
        }

        res.status(200).json(users)
    } catch (error) {
        console.log(error);
        res.status(404).render('errorpage', { error: error.message, status: 404 })
    }
})

const getUserByEmail = asyncHandler(async (req, res) => {
    try {
        const email = req.body.email
        const user = await fetchUserByEmail(email)
        if (!user || user.length != 1) {
            throw new Error('No user with provided email found')
        }

        req.session.user = user
        res.status(200).redirect('/account')
    } catch (error) {
        console.log(error);
        res.status(404).render('errorpage', { status: 404, error: error.message })
    }
})

const addUser = asyncHandler(async(req, res) => {
    const firstName = req.body.fname
    const lastName = req.body.lname
    const email = req.body.email
    try {
        await insertUser(firstName, lastName, email)

        return res.status(200).render('index', {home: false, bank: false, admin: false, user: true, account: false})
    } catch (error) {
        console.log(error);
        return res.status(404).render('errorpage', {status: 404, error:error.message})
    }
})


module.exports = {
    getAllUsers,
    getUserByEmail,
    addUser
}
