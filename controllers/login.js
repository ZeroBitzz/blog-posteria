const { User } = require('../models')
const { hashPassword } = require('../utils/hashPassword')


exports.loginPage = (_, res) => {
    return res.render('login', { title: 'Login', active: {login: true} })
}

exports.login = async (req, res, next) => {
    const username = req.body.username
    const password = req.body.password

    if (!username || !password) return res.sendStatus(401)

    const user = await User.findOne({ where: { username } })

    if (!user) return res.status(401).send('Error: Username is not authorized')

    if (hashPassword(password) !== user.password) return res.status(401).send('Error: Wrong password')

    req.session.regenerate(function (err) {
        if (err) next(err)

        req.session.user = user

        // save the session before redirection to ensure page
        // load does not happen before session is saved
        req.session.save(function (err) {
          if (err) return next(err)
           res.redirect('/dashboard')
        })
    })

}