const {hashPassword} = require('../utils/hashPassword')
const { User } = require('../models')

exports.signup = async (req, res, next) => {

    const username = req.body.username
    const password = req.body.password
    const reenteredPassword = req.body.reenteredpassword

    if (!username || !password || !reenteredPassword) return res.status(401).send('Error: missing username or password')

    if (reenteredPassword !== password ) return res.status(400).send('Error: Passwords do not match')

    const conflictingUser = await User.findOne({ where: { username } })

    if(conflictingUser) return res.status(409).send('Error: Username already exists')

    const user = await User.create({
        username,
        password: hashPassword(password)
    }, {raw: true})


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

exports.signupPage = async (req, res) => {
    if (req.session.user) return res.redirect('/dashboard')

    return res.render('signup', { title: 'Sign in', active: {login: true}})
}