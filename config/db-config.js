const mysql = require('mysql2/promise')

const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Shane0313$',
    database: 'mybank'
}

const createConnection = async () => {
    const connection = await mysql.createConnection(dbConfig)
    // console.log(connection);
    return connection
}

module.exports = {
    createConnection
}