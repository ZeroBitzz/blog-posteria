exports.logout = async (req, res) => {
    req.session.user = null
    req.session.save(function (err) {
      if (err) next(err)

      // regenerate the session, which is good practice to help
      // guard against forms of session fixation
      req.session.regenerate(function (err) {
        if (err) next(err)
        res.redirect('/')
      })
    })
}