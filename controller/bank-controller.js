const { fetchBanks, addBank, fetchBankById } = require('../service/bank-service')
const asyncHandler = require('express-async-handler')

const getBanks = asyncHandler(async (req, res) => {
    // console.log('in controller');
    try {
        const banks = await fetchBanks()
        if (!banks || banks.length == 0) {
            throw new Error('No banks found!')
        }

        res.status(200).json(banks)
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            err: error.message
        })
    }
})

const addBankByBankName = async (req, res) => {
    try {
        const bankName = req.body.name
        await addBank(bankName)
        res.status(200).render('index', {home: true, bank: false, admin: false, user: false, account: false})
    } catch (error) {
        console.log(error);
        return res.status(404).render('errorpage', { error: error.message, status: 404 })
    }
}

const getBankById = asyncHandler(async(req, res) => {
    try {
        const bankId = req.body.id
        const bank = await fetchBankById(bankId)
        if(!bank) {
            throw new Error('No bank found')
        }
        req.session.bank = bank
        res.status(200).redirect('/bank')
    } catch (error) {
        console.log(error.message);
        res.status(404).render('errorpage', {status: 400, error: error.message})
    }
})

module.exports = {
    getBanks,
    addBankByBankName,
    getBankById
}