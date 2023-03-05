const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Pet extends Model {}

/**
 * 
 * @param {Sequelize} sequelize 
 */

 // pet model by id, name, species, breed, size, allergies, diet_needs, other_needs, age, owner_id, product_id
Pet.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        species: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        breed: {
            type: DataTypes.STRING,
        },
        size: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        allergies: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        diet_needs: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        other_needs: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        product_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'product',
                key: 'id',
            },
        },
    },
    
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'pet',
    }
);

module.exports = Pet;