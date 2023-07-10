const { getAllBanks, insertBank, getBankById } = require('../repository/bank-repository')
const asyncHandler = require('express-async-handler')

const fetchBanks = asyncHandler(async () => {
    // console.log('in service');
    const banks = await getAllBanks()
    if (!banks || banks.length == 0) {
        throw new Error('No banks found')
    }
    // console.log(banks);
    return banks
})

const addBank = asyncHandler(async (bankName) => {
    try {
        await insertBank(bankName)
    } catch (error) {
        throw error
    }
})

const fetchBankById = asyncHandler(async (id) => {
    const bank = await getBankById(id)
    if(!bank || bank.length != 1) {
        throw new Error('No bank found')
    }

    return bank
})

module.exports = {
    fetchBanks,
    addBank,
    fetchBankById
}