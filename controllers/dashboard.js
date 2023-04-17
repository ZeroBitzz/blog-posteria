const { Post } = require('../models')

exports.dashboard = async (req, res) => {
    const userId = req.session.user.id
    const posts = await Post.findAll({where: { userId }, raw : true})
    return res.render('dashboard', { title: 'Dashboard', posts, isLoggedIn: req.session.user, active: {dashboard: true} })
}