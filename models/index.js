const dbConfig = require('../../configs/db.config');

const Sequelize = require('sequelize');
// Configure Sequelize to connect to MySQL database
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
	operatorsAliases: false,

	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		acquire: dbConfig.pool.acquire,
		idle: dbConfig.pool.idle,
	},
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// sample model for user
db.users = require('./user.model')(sequelize, Sequelize);

module.exports = db;
