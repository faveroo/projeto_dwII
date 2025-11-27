const app = require('./src/app');
const sequelize = require('./src/config/database');

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true }) // cria/atualiza tabelas automaticamente
    .then(() => {
        console.log('Banco sincronizado com sucesso!');
        app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
    })
    .catch(err => console.error('Erro ao sincronizar o banco:', err));
