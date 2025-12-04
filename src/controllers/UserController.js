const { User } = require('../models')

class UserController {

    static async index(req, res) {
        const user = await User.findByPk(req.session.userId)
        return res.render('shop/profile', { user })
    }
    static async update(req, res) {
        try {
            const userId = req.session.userId

            let updateData = { name: req.body.name, email: req.body.email };

            if (req.file) {
                updateData.photo = req.file.filename;
            }

            await User.update(updateData, { where: { id: userId } })

            const updatedUser = await User.findByPk(userId);
            req.session.user = updatedUser;

            req.flash('success', 'Perfil atualizado com sucesso!');
            return res.redirect('/user/profile');

        } catch (error) {
            console.log(error)
            req.flash('error', 'Erro ao atualizar perfil');
            return res.redirect('/user/profile')
        }
    }

    static async indexAdmin(req, res) {
        const users = await User.findAll()
        return res.render('shop/admin', { users })
    }

    static async admin(req, res) {
        const { email, role, name, password } = req.body
        const ocorrence = await User.findOne({ where: { email } })

        try {
            if (ocorrence) {
                if (ocorrence.role !== role) {
                    await User.update({ role: role }, { where: { id: ocorrence.id } })
                    req.flash('success', 'Função do usuário atualizada com sucesso!')
                } else {
                    req.flash('info', 'Usuário já existe com essa função.')
                }
                return res.redirect('/user/admin')

            } else {
                await User.create({ name, email, password, role })
                req.flash('success', 'Administrador criado com sucesso!')
                return res.redirect('/user/admin')
            }

        } catch (error) {
            console.log(error)
            req.flash('error', 'Erro ao processar solicitação')
            return res.redirect('/user/admin')
        }
    }

    static async promote(req, res) {
        const { id } = req.params
        try {
            const u = await User.findByPk(id)

            if (u.email == 'admin@admin.com') {
                req.flash('error', 'Não é possível demover o administrador padrão!')
                return res.redirect('/user/admin')
            }

            if (u.role === 'admin') {
                await User.update({ role: 'user' }, { where: { id } })
                req.flash('success', 'Usuário demovido de administrador!')
            }
            if (u.role === 'user') {
                await User.update({ role: 'admin' }, { where: { id } })
                req.flash('success', 'Usuário promovido a administrador!')
            }
            return res.redirect('/user/admin')
        } catch (error) {
            console.log(error)
            req.flash('error', 'Erro ao promover usuário')
            return res.redirect('/user/admin')
        }
    }
}

module.exports = UserController