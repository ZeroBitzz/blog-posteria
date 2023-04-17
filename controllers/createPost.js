const { Post } = require('../models')

exports.createPost = async (req, res) => {

    const title = req.body.title
    const body = req.body.body

    if (!title || !body) return res.status(400).send('Error: missing title or body')

    const user = req.session.user;
    await Post.create({
        title,
        body,
        author: user.username,
        userId: user.id
    });

    return res.redirect('/dashboard')
}

exports.createPostPage = async (req, res) => {
    return res.render('createPost', { title: 'CreatePost', isLoggedIn: req.session.user})
}