const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Product extends Model {}

Product.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        prod_description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        quantity: { 
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        image_file:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        allergens: {
            type: DataTypes.BOOLEAN,
        },
        age_prefered: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'product',
    }
);


module.exports = Product;