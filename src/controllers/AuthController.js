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

    static async register(req, res) {
        const { name, email, password } = req.body

        User.create({ name, email, password })
            .then(() => {
                req.flash('success', 'Usuário criado com sucesso')
                return res.redirect('/')
            })
            .catch(error => {
                console.error(error)
                req.flash('error', 'Erro ao criar usuário')
                return res.redirect('/')
            })
    }

    static async logout(req, res) {
        req.session.destroy()
        return res.redirect('/')
    }
}

module.exports = AuthController;