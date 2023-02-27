//took from the previous projects as template

const router = require('express').Router();
const apiRoutes = require('./controllers/routes-');
const express = require('express');

// router.use('/routes', apiRoutes);

//middleware

//Maxs code
module.exports = router;


require('dotenv').config();

// get express
const cors = require('cors');

const app = express();

// configure app
app.use(cors());

// db config
const db = require('./models');

db.sequelize
	.sync()
	.then(() => console.log('Synced db'))
	.catch((err) => console.log(`Failed to sync db: ${err}`));

const routes = require('./controllers/routes-');
const { middleware } = require('yargs');

// require routes
app.use('/users', routes.users);

// get the port from the env
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
