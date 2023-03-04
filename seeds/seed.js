const sequelize = require('../config/connection');
const { User, Product, Pet } = require('../models');


const userData = require('./userData.json');
const productData = require('./productsData.json');
const petData = require('./petData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const products = await Product.bulkCreate(productData, {
    individualHooks: true,
    returning: true,
  });

  const pets = await Pet.bulkCreate(petData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();