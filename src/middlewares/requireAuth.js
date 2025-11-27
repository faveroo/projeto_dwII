module.exports = (req, res, next) => {
    if (!req.session.userId) {
        req.flash('error', 'Você precisa estar logado para acessar essa página')
        return res.redirect('/');
    }
    next();
};
