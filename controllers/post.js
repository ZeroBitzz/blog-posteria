const { Post, User, Comment } = require('../models')
const {formattedDate} = require('../utils/formattedDate')

exports.blogPost = async (req, res) => {
    const postId = req.params?.id
    const post = await Post.findOne({ where: { id: postId }, raw : true })
    const user = await User.findOne({ where: { id: post.userId }, raw : true })
    const comments = await Comment.findAll({ where: { postId }, raw : true })
    const author = user.username
    const createdAt = formattedDate(post.createdAt)
    return res.render('post', { title: `Post ${postId}`, postId, post, author, createdAt, comments, isLoggedIn: req.session.user})
}