exports.notFound = (req, res) => {
    return res.render('notFound', { title: '404 page not found', isLoggedIn: req.session.user })
}