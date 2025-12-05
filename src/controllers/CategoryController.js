const { Category, Product } = require('../models');

class CategoryController {
    static async createCategory(req, res) {
        return res.render('shop/create/create-category')
    }

    static async storeCategory(req, res) {
        const { name, description, price, stock, category_id } = req.body

        Category.create({ name, description, price, stock, category_id })
            .then(() => {
                req.flash('success', 'Categoria criada com sucesso')
                return res.redirect('/category/list-categories')
            })
            .catch(error => {
                console.error(error)
                req.flash('error', 'Erro ao criar categoria')
                return res.redirect('/category/list-categories')
            })
    }

    static async listCategories(req, res) {
        Category.findAll()
            .then(categories => {
                return res.render('shop/list/list-categories', { categories })
            })
            .catch(error => {
                console.error(error)
                req.flash('error', 'Erro ao listar categorias')
                return res.redirect('/category/list-categories')
            })
    }

    static async listCategory(req, res) {
        const { id } = req.params
        Category.findByPk(id)
            .then(category => {
                Product.findAll({ where: { category_id: id } })
                    .then(products => {
                        category.products = products
                        return res.render('shop/item-category', { category })
                    })
            })
            .catch(error => {
                console.error(error)
                req.flash('error', 'Erro ao listar categoria')
                return res.redirect('/category/list-categories')
            })
    }

    static async remove(req, res) {
        const { id } = req.params
        Category.destroy({ where: { id } })
            .then(() => {
                req.flash('success', 'Categoria removida com sucesso')
                return res.redirect('/category/list-categories')
            })
            .catch(error => {
                console.error(error)
                req.flash('error', 'Erro ao remover categoria')
                return res.redirect('/category/list-categories')
            })
    }
}

module.exports = CategoryController
