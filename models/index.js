// import models
const Product = require('./Product');
const Pet = require('./Pet');
const User = require('./User');
const dbConfig = require('../configs/db.config');


Pet.belongsTo(User, {
	foreignKey: 'owner_id'
});

User.hasMany(Pet, {
	foreignKey: 'owner_id',
	onDelete: 'CASCADE',
});

module.exports = {
	Product,
	Pet,
	User,
};
