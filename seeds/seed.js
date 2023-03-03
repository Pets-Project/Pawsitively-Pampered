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

  for (const pet of petData) {
    await Pet.create({
      ...pet,
      owner_id: users[Math.floor(Math.random() * users.length)].id,
      product_id: products[Math.floor(Math.random() * products.length)].id,
    });
  }


  process.exit(0);
};

seedDatabase();