const userService = require('../services/user.service');

exports.createUser = async (req, res) => {
	// validate request
	// ensure to validate req.body
	// create user
	const user = userService.createUser(req.body);
	// send a created user
	res.json(user);
};
