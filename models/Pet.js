const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Pet extends Model {}

/**
 * 
 * @param {Sequelize} sequelize 
 */

 
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
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        allergies: {
            type: DataTypes.STRING,
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
            allowNull: false,
            references: {
                model: 'product',
                key: 'id',
            },
        },
        weight: {
            type: Datatypes.DECIMAL,
            allowNull: false,
        },
        tags: {
            references: {
                model: 'pet',
                key: 'species',
            },
            references: {
                model: 'pet',
                key: 'breed',
            },
            references: {
                model: 'pet',
                key: 'allergies'
            },
            references: {
                model: 'pet',
                key: 'diet_needs',
            },
            references: {
                model: 'pet',
                key: 'age',
            },
            references: {
                model: 'pet',
                key: 'weight',
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