const router = require('express').Router();
const { User, Product, Pet } = require('../models');
const withAuth = require('../utils/auth');
const nodemailer = require('nodemailer');

//gets homepage route
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

//gets profile route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ 
        model: Pet,
        include: [{ model: Product }]

      }]
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
// gets contact form
router.get('/contactform', async (req, res) => {
  try {
    // Pass serialized data and session flag into template
    res.render('contactform');
  } catch (err) {
    res.status(500).json(err);
  }
});

// contact form post for receive email from customers
router.post('/send', (req, res) => {
  console.log(req.body);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mannyrveloz10@gmail.com', //this email has to be change with the email of the project.
      pass: 'otfgqpwuvdwarotm' //this password have to be generated in gmail: 
      //1)Go to the google account security section 
      //2) turn on 2-step verification under "singing in" to google (else 3rd step is not possible) 
      //3) under signing in to google you will find App passwords, click it 
      //4) select the "select app" and click custom app 
      //5) Type any name of your choice and generate a password. Now use the same email account and instead of your real password use the generated password.
    }
  }); 
  const mailOptions = {
    from: req.body.email,
    to: 'mannyrveloz10@gmail.com', //this email has to be change with the email of the project too.
    subject: `Message from ${req.body.email}: ${req.body.subject}`,
    text: req.body.message
  };
  transporter.sendMail(mailOptions, (error, info)=>{
    if(error){
      console.log(error);
      res.send('error')
    }else{
      console.log('Email sent: '+ info.response);
      res.send('success')
    }
  });
});


// gets products
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
//gets products by id
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