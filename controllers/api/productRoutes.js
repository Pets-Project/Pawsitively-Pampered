const { Product } = require('../../models');

const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const productData = await Product.findAll();
        res.status(200).json(productData);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const productData = await Product.findByPk(req.params.id);
        if (!productData) {
            res.status(404).json({ message: 'No product found with this id!' });
            return;
        }
        res.status(200).json(productData);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const productData = await Product.create(req.body);
        res.status(200).json(productData);
    } catch (err) {
        res.status(400).json(err.message);
    }
});


router.post('/bulk', async (req, res) => {
    try {
        const products = await Product.bulkCreate(req.body);
        res.status(201).json(products);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        try {
            const productData = await Product.update(req.body, {
                where: {
                    id: req.params.id,
                },
            });
            if (!productData[0]) {
                res.status(404).json({ message: 'No product with this id!' });
                return;
            }
            res.status(200).json(productData);
        } catch (err) {
            res.status(500).json(err.message);
        }
    } catch (error) {

    }
});

router.delete('/:id', async (req, res) => {
    try {
        const productData = await Product.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!productData) {
            res.status(404).json({ message: 'No product found with this id!' });
            return;
        }
        res.status(200).json(productData);
    } catch (err) {
        res.status(500).json(err.message);
    }
});


router.get('/products', async (req, res) => {
    try {
        const query = req.query.q;

        // search for products based on the query string
        const products = await Product.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${query}%`
                }
            }
        });

        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;