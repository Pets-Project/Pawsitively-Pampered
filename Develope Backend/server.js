require('dotenv').config();

// get express
const express = require('express');
const cors = require('cors');

const app = express();

// configure app
app.use(cors());

// db config
const db = require('./src/models');

db.sequelize
	.sync()
	.then(() => console.log('Synced db'))
	.catch((err) => console.log(`Failed to sync db: ${err}`));

const routes = require('./src/routes');

// require routes
app.use('/users', routes.users);

// get the port from the env
const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
