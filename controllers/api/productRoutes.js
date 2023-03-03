const router = require('express').Router();
const { Product } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const prodData = await Product.findAll({
            include: [
                {
                    model: Product,
                    attributes: ['id', 'name', 'prod_description', 'price', 'quantity', 'image_file', 'allergens', 'age_preferred'],
                    
                },
            ],
        });

        const prod = prodData.map((prod) => prod.get({ plain: true}));
        res.render('products', {
            Product
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/', async (req, res) => {
    try {
        const prodData = await Product.findByPk({
            include: [
                {
                    model: Product,
                    attributes: ['id', 'name', 'prod_description', 'price', 'quantity', 'image_file', 'allergens', 'age_preferred'],
                    
                },
            ],
        });

        const prod = prodData.map((prod) => prod.get({ plain: true}));
        res.render('products', {
            Product
        });
    } catch (err) {
        res.status(500).json(err);
    }
});