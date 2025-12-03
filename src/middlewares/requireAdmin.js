module.exports = (req, res, next) => {
    if (req.session.userRole !== 'admin') {
        req.flash('error', 'Acesso negado')
        return res.redirect('/shop')
    }
    next()
}