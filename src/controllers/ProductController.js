const { Product, Category } = require('../models')

class ProductController {
    static async indexProduct(req, res) {
        try {
            const products = await Product.findAll()
            const categories = await Category.findAll()
            return res.render('shop/list/list-products', { products, categories })
        } catch (error) {
            console.error(error)
            req.flash('error', 'Erro ao listar produtos')
            return res.redirect('/shop')
        }
    }

    static async createProduct(req, res) {
        try {
            const categories = await Category.findAll()
            return res.render('shop/create/create-product', { categories })
        } catch (error) {
            console.error(error)
            req.flash('error', 'Erro ao listar categorias')
            return res.redirect('/shop')
        }
    }

    static async storeProduct(req, res) {
        try {
            const { name, description, price, stock, category_id } = req.body
            const p = price.replace(',', '.')
            const image = req.file ? `/uploads/${req.file.filename}` : null

            Product.create({ name, description, price: p, stock, category_id, image })
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

    static async showProduct(req, res) {
        try {
            const { id } = req.params
            const product = await Product.findByPk(id)
            const categories = await Category.findAll()
            return res.render('shop/product-detail', { product, categories })
        } catch (error) {
            console.error(error)
            req.flash('error', 'Erro ao listar produtos')
            return res.redirect('/shop')
        }
    }
}

module.exports = ProductController