const { Product, Coupon } = require('../models')

class CartController {

    static async index(req, res) {
        const cart = req.session.cart || []

        const total = cart.reduce((sum, item) =>
            sum + item.price * item.quantity,
            0)

        let discount = 0

        if (req.session.coupon) {
            const cup = req.session.coupon;

            if (typeof cup.percent === "number") {
                discount = total * (cup.percent / 100);
            }
        }

        const finalPrice = total - discount;

        return res.render("shop/cart", { cart, total, discount, finalPrice, coupon: req.session.coupon || null })
    }

    static async add(req, res) {
        const product_id = req.params.id
        const productId = Number(product_id)

        if (!productId || isNaN(productId)) {
            req.flash('error', 'ID do produto inválido');
            return res.redirect('/shop');
        }

        try {
            const product = await Product.findByPk(productId)

            if (!product) {
                return res.status(404).json({ error: 'Produto não encontrado' })
            }

            if (!req.session.cart) req.session.cart = []

            if (product.stock === 0) {
                req.flash('error', 'Produto sem estoque');
                return res.redirect('/product/list-products');
            }

            Product.update({ stock: product.stock - 1 }, { where: { id: productId } })
            const existing = req.session.cart.find(item => item.id === productId)

            if (existing) {
                existing.quantity++
            } else {
                req.session.cart.push({ id: productId, name: product.name, price: product.price, quantity: 1 })
            }

            req.flash('success', 'Produto adicionado ao carrinho')
            return res.redirect('/product/list-products')

        } catch (error) {
            console.error('Erro ao adicionar ao carrinho:', error);
            req.flash('error', 'Erro ao adicionar produto');
            return res.redirect('/product/list-products');
        }
    }

    static async remove(req, res) {
        const product_id = req.params.id
        const productId = Number(product_id)

        if (!productId || isNaN(productId)) {
            req.flash('error', 'ID do produto inválido');
            return res.redirect('/cart');
        }

        try {
            const product = await Product.findByPk(productId)

            if (!product) {
                return res.status(404).json({ error: 'Produto não encontrado' })
            }

            if (!req.session.cart) req.session.cart = []

            const existing = req.session.cart.find(item => item.id === productId)
            Product.update({ stock: product.stock + 1 }, { where: { id: productId } })

            if (existing) {
                existing.quantity--

                if (existing.quantity <= 0) {
                    req.session.cart = req.session.cart.filter(item => item.id !== productId)
                }
            }

            req.flash('success', 'Produto removido do carrinho')
            return res.redirect('/cart')
        } catch (error) {
            console.error('Erro ao remover do carrinho:', error);
            req.flash('error', 'Erro ao remover produto');
            return res.redirect('/cart');
        }
    }

    static async applyCoupon(req, res) {
        const couponName = req.body.coupon

        try {
            const coupon = await Coupon.findOne({ where: { name: couponName } })

            if (!coupon) {
                req.flash('error', 'Cupom inválido')
                return res.redirect('/cart')
            }

            req.session.coupon = coupon
            req.flash('success', 'Cupom aplicado com sucesso')
            return res.redirect('/cart')
        } catch (error) {
            console.error('Erro ao aplicar cupom:', error);
            req.flash('error', 'Erro ao aplicar cupom');
            return res.redirect('/cart');
        }
    }
}

module.exports = CartController