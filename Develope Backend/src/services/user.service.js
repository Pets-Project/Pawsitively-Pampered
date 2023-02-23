const db = require('../models');
const User = db.users;
const Op = db.Sequelize.Op;

const createUser = async (data) => {
	// create user from the data received object
	return await User.create(data);
};

module.exports = { createUser };
