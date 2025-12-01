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
}

module.exports = UserController