const User = require('./User');
const Product = require('./Product');
const Pet = require('./Pet');
//links the models together in the database
User.hasMany(Pet, {
    foreignKey: 'owner_id',
    onDelete: 'CASCADE'
});

Pet.belongsTo(User, {
    foreignKey: 'owner_id'
});



Pet.hasMany(Product, {
    foreignKey: 'product_id',
    onDelete: 'CASCADE'
});

Product.belongsTo(Pet, {
    foreignKey: 'product_id'
});



module.exports = { User, Product, Pet };
