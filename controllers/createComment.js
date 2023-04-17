const { Comment } = require('../models')

exports.createComment = async (req, res) => {

    const postId = req.body.postId
    const comment = req.body.comment

    if (!postId || !comment) return res.status(400).send('Error: missing postId or comment')

    const user = req.session.user;
    await Comment.create({
        postId: parseInt(postId),
        comment,
        author: user.username,
        userId: user.id
    });

    return res.redirect(`/posts/${postId}`)
}