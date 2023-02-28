//const User = require('./User');
//const Product = require('./Product');
//const Pet = require('./Pet');
const dbConfig = require('../configs/db.config');

const { Sequelize } = require('sequelize');
const Pet = require('./Pet.model');
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

db.User = require('./User.model')(sequelize);
db.Pet = require('./Pet.model')(sequelize);
db.Product = require('./Product.model')(sequelize);



module.exports = db;



//module.exports = { User, Product, Pet };
