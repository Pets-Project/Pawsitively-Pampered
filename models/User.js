const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

/**
 * Represents a user in the system.
 * @constructor
 * @param {Object} attributes - The attributes of the user.
 * @param {string} attributes.name - The name of the user.
 * @param {string} attributes.password - The password of the user.
 * @param {string} attributes.role - The role of the user.
 * @param {string} attributes.email - The email of the user.
 */
class User extends Model {
}

/**
 * 
 * @param {Sequelize} sequelize 
 */
 const User = (sequelize) => {
User.init(
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
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true,
                len: [8, 14],
            },
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);
return UserModel;
};

module.exports = User;