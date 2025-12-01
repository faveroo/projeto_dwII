const { User } = require('../models')

class AuthController {
    static async loginPage(req, res) {
        return res.render('login')
    }

    static async login(req, res) {
        const { email, password } = req.body

        User.findOne({ where: { email } })
            .then(user => {
                if (!user) {
                    return res.render('login', { error: 'Usuário não encontrado' })
                }

                if (user.password !== password) {
                    return res.render('login', { error: 'Senha incorreta' })
                }

                req.session.userId = user.id
                req.session.userRole = user.role
                req.session.userName = user.name
                return res.redirect('/shop')
            })
            .catch(error => {
                console.error(error)
                return res.render('login', { error: 'Erro ao fazer login' })
            })
    }

    static async logout(req, res) {
        req.session.destroy()
        return res.redirect('/shop')
    }
}

module.exports = AuthController;