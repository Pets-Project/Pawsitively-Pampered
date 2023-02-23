const usersControllers = require('../controllers/user.controller');

const router = require('express').Router();

router.post('/', usersControllers.createUser);

module.exports = router;
