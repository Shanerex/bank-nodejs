const errorMsg = 'You have not logged in!'

const bankAuth = async(req, res, next) => {
    if(!req.session.bank) {
        return res.status(403).render('errorpage', {status: 403, error: errorMsg})
    } else {
        next()
    }
}

const userAuth = async(req, res, next) => {
    if(!req.session.user) {
        return res.status(403).render('errorpage', {status: 403, error: errorMsg})
    } else {
        next()
    }
}

const accountAuth = async(req, res, next) => {
    if(!req.session.account) {
        return res.status(403).render('errorpage', {status: 403, error: errorMsg})
    } else {
        next()
    }
}

module.exports = {
    bankAuth,
    userAuth,
    accountAuth
}