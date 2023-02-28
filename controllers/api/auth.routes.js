/*Not sure if we wanted to use bcrypt

const bcrypt = require('bcrypt');
const { User } = require('../../models');

const app = require('express').Router();
// Register a new user
app.post('/register', async (req, res) => {
    try {
        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create a new user with the hashed password
        const user = await User.create({
            ...req.body,
            password: await bcrypt.hash(req.body.password, salt),
        });

        res.status(201).send('User created');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Login a user
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send('Please provide an email and password');
        }
        // Find the user by email
        const user = await User.findOne({ where: { email } });

        // If user not found, return error
        if (!user) {
            return res.status(401).send('Invalid email or password');
        }

        // Check if password is correct
        const validPassword = await bcrypt.compare(password, user.password);

        // If password is incorrect, return error
        if (!validPassword) {
            return res.status(401).send('Invalid email or password');
        }

        // If email and password are correct, log in the user
        res.status(200).send('Logged in successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

module.exports = app;