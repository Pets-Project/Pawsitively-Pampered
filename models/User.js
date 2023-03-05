const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

/**
 * Represents a user in the system.
 * @constructor
 * @param {Object} attributes - The attributes of the user.
 * @param {string} attributes.name - The name of the user.
 * @param {string} attributes.password - The password of the user.
 * @param {string} attributes.role - The role of the user.
 * @param {string} attributes.email - The email of the user.
 */
class User extends Model { checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}
// user mode with id, name , password, and email
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
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
    },
    //user authentification with bcrypt
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);



module.exports = User;