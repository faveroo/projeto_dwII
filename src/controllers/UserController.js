const { User } = require('../models')

class UserController {

    static async index(req, res) {
        const user = await User.findByPk(req.session.userId)
        return res.render('shop/profile', { user })
    }
    static async update(req, res) {
        const user = await User.findByPk(req.session.userId)
        user.name = req.body.name
        user.email = req.body.email
        user.password = req.body.password
        await user.save()
        return res.redirect('/user/profile')
    }
}

module.exports = UserController