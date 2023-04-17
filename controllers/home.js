const { Post } = require('../models')

exports.home = async (req, res) => {
    const posts = await Post.findAll({raw : true})
    return res.render('home', { title: 'Blog Home page', posts, isLoggedIn: req.session.user, active: {home: true} })
}