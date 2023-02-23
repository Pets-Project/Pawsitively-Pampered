const { Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connection');

class Pet extends Model {}

Pet.init(
    {
        id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        species: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        breed: {
            type: Datatypes.STRING,
        },
        owner_id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        gender: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        allergies: {
            type: Datatypes.STRING,
        },
        diet_needs: {
            type: Datatypes.STRING,
        },
        other_needs: {
            type: Datatypes.STRING,
        },
        age: {
            type: Datatypes.INTEGER,
            allowNull: false,
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