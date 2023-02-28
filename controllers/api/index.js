const router = require('express').Router();
const userRoutes = require('./userRoutes');
// const projectRoutes = require('./productRoutes');

router.use('/users', userRoutes);
// router.use('/products', projectRoutes);

module.exports = router;

/*
const auth = require('./auth.routes');
const user = require('./userRoutes');
const pet = require('./pets.routes');
const product = require('./productRoutes');
module.exports = { auth, user, pet, product }