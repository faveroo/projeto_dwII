module.exports = (req, res, next) => {
    if (req.session.userId) {
        res.locals.user = {
            id: req.session.userId,
            role: req.session.userRole,
            name: req.session.userName
        };
    } else {
        res.locals.user = null;
    }
    next();
};
