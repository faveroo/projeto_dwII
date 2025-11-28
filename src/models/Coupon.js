const { Model, DataTypes } = require('sequelize')
const sequelize = require("../config/database")

class Coupon extends Model { }
Coupon.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        percent: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true

        }
    },
    {
        sequelize,
        modelName: 'Coupon',
        tableName: 'coupons',
        timestamps: true,
    }
)

module.exports = Coupon
