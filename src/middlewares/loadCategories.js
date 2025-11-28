const Category = require("../models/Category");

module.exports = async (req, res, next) => {
    try {
        const categories = await Category.findAll();
        res.locals.categories = categories; // agora todas views têm acesso
        next();
    } catch (err) {
        next(err);
    }
};
