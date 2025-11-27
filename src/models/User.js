const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model { }
User.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'user',
        }
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
    }
);



module.exports = User;
