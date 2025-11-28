const Category = require('../models/Category');

class CategoryController {
    static async createCategory(req, res) {
        return res.render('shop/create-category')
    }

    static async storeCategory(req, res) {
        const { name, description, price, stock, category_id } = req.body

        Category.create({ name, description, price, stock, category_id })
            .then(() => {
                req.flash('success', 'Categoria criada com sucesso')
                return res.redirect('/category/create-category')
            })
            .catch(error => {
                console.error(error)
                req.flash('error', 'Erro ao criar categoria')
                return res.redirect('/category/create-category')
            })
    }

    static async listCategories(req, res) {
        Category.findAll()
            .then(categories => {
                return res.render('shop/list-categories', { categories })
            })
            .catch(error => {
                console.error(error)
                req.flash('error', 'Erro ao listar categorias')
                return res.redirect('/category/create-category')
            })
    }
}

module.exports = CategoryController
