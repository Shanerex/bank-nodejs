const express = require('express')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const path = require('path')
const hbs = require('hbs')
const { bankAuth, userAuth, accountAuth } = require('../middleware/authHandler')
const bankRouter = require('../routes/bank-routes')
const userRouter = require('../routes/user-routes')
const accountRouter = require('../routes/account-routes')
const transactionRouter = require('../routes/transaction-routes')
const homeRouter = require('../routes/home-routes')
const adminRouter = require('../routes/admin-routes')


const app = express()
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname,'../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))


app.use(express.static(path.join(__dirname, '../public')))
app.use(expressSession({
    secret: 'my-bank', //a secret string used to sign the session ID cookie
    resave: false, //do not save session if unmodified
    saveUninitialized: false //do not create session until something is stored
}))
app.use(bodyParser.urlencoded({extended: true}))


//routes
app.use('/', homeRouter)
app.use('/bank', bankRouter)
app.use('/admin', bankAuth, adminRouter)
app.use('/user', bankAuth, userRouter)
app.use('/account', userAuth, accountRouter)
app.use('/transaction', accountAuth, transactionRouter)




app.listen(3000, () => {
    console.log('Server is up at port: 3000');
})