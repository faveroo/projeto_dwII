const Product = require('../models/Product')

class ProductController {
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