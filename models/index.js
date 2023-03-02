const User = require('./User');
const Product = require('./Product');
const Pet = require('./Pet');

User.hasMany(Pet, {
    foreignKey: owner_id,
});

Pet.belongsTo(User, {
    foreignKey: owner_id,
});

// Pet.hasMany(Product, {
//     foreignKey: product_id,
// });

module.exports = { User, Product, Pet };
