const Product = require('../models/Product')
const Category = require('../models/Category')

class ProductController {
    static async indexProduct(req, res) {
        try {
            const products = await Product.findAll()
            const categories = await Category.findAll()
            return res.render('shop/list-products', { products, categories })
        } catch (error) {
            console.error(error)
            req.flash('error', 'Erro ao listar produtos')
            return res.redirect('/shop')
        }
    }

    static async createProduct(req, res) {
        try {
            const categories = await Category.findAll()
            return res.render('shop/create-product', { categories })
        } catch (error) {
            console.error(error)
            req.flash('error', 'Erro ao listar categorias')
            return res.redirect('/shop')
        }
    }

    static async storeProduct(req, res) {
        try {
            const { name, description, price, stock, category_id } = req.body

            Product.create({ name, description, price, stock, category_id })
                .then(() => {
                    req.flash('success', 'Produto criado com sucesso')
                    return res.redirect('/shop')
                })
                .catch(error => {
                    console.error(error)
                    req.flash('error', 'Erro ao criar produto')
                    return res.redirect('/shop')
                })
        } catch (error) {
            console.error(error);
            req.flash('error', 'Erro ao criar produto')
            return res.redirect('/shop')
        }
    }
}

module.exports = ProductController