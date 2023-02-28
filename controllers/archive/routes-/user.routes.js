const usersControllers = require('../user.controller');

const router = require('express').Router();

router.post('/', usersControllers.createUser);

module.exports = router;
