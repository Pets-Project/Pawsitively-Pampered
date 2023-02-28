const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/connection');

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
            validate: {
                len: [8, 14],
            },
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'owner',
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: {
                msg: 'Email address is already in use'
            },
            validate: {
                isEmail: true,
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