const router = require('express').Router();
const { User, Product, Pet } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const userData = await User.findAll({
    });

    // Serialize data so the template can read it
    const user = userData.map((user) => user.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      User
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Pet }]
    });

    const user = userData.get({ plain: true });
    console.log(user);
    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/contactform', async (req, res) => {
  try {
    // Pass serialized data and session flag into template
    res.render('contactform');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/products', async (req, res) => {
  try {
    const productData = await Product.findAll({
    });
  

    const products = productData.map((product) => product.get({ plain: true }));
    res.render('products', { products });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id , {
      
    });
  console.log(productData);

    const products = productData.get({ plain: true });
    console.log(products);
    res.render('productdetails', { products });
  } catch (err) {
    res.status(500).json(err);
  }
});





module.exports = router;