const { Product } = require('../models')

class CartController {

    static async index(req, res) {
        const cart = req.session.cart || []

        const total = cart.reduce((sum, item) =>
            sum + item.price * item.quantity,
            0)

        return res.render("shop/cart", { cart, total })
    }

    static async add(req, res) {
        const { product_id } = req.body
        const productId = Number(product_id)
        const product = await Product.findByPk(productId)

        if (!product) {
            return res.status(404).json({ error: 'Produto não encontrado' })
        }

        if (!req.session.cart) req.session.cart = []

        const existing = req.session.cart.find(item => item.id === productId)

        if (existing) {
            existing.quantity++
        } else {
            req.session.cart.push({ id: productId, name: product.name, price: product.price, quantity: 1 })
        }

        req.flash('success', 'Produto adicionado ao carrinho')
        return res.redirect('/shop/cart')
    }

    static async remove(req, res) {
        const { product_id } = req.body
        const productId = Number(product_id)
        const product = await Product.findByPk(productId)

        if (!product) {
            return res.status(404).json({ error: 'Produto não encontrado' })
        }

        if (!req.session.cart) req.session.cart = []

        const existing = req.session.cart.find(item => item.id === productId)

        if (existing) {
            existing.quantity--

            if (existing.quantity <= 0) {
                req.session.cart = req.session.cart.filter(item => item.id !== productId)
            }
        }

        req.flash('success', 'Produto removido do carrinho')
        return res.redirect('/shop/cart')
    }
}

module.exports = CartController