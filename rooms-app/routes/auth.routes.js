const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const saltRounds = 10;

const User = require('../models/User.model');

const { isLoggedIn, isLoggedOut} = require('../middleware/route-guard');

//GET sign up
router.get('/signup', (req, res) => {
    res.render('auth/signup');
})

//POST sign up
router.post('/signup', async (req, res) => {
    
    const {username, email, password} = req.body;

    if (!username || !email || !password) {
        res.render('auth/signup', {errorMessage: "All fields are mandatory. Please provide your username, email and password."});
        return;
    }

    const passwordHash = await bcrypt.hash(password, saltRounds);

    User.create({username, email, password: passwordHash})
        .then(() => res.redirect("/rooms/list"))
        .catch(err => console.log(err))
})


//GET login
router.get('/login', (req, res) => {
    res.render('auth/login');
})

//POST login
router.post('/login', (req, res) => {
    console.log("Printing the current session: ", req.session);
    const {email, password} = req.body;

    //data validation check: fields must be filled in
    if (!email || !password) {
        res.render('auth/login', {errorMessage: "Please enter both email and password."});
        return;
    }

    //now, logging in the user:
    //checking if user exists in the db with a unique identifier: the email
    //checking if password entered matches the password attached to the user in the db
    User.findOne({ email })
        .then(user => {
            if (!user) {
                res.render('auth/login', {errorMessage: "User not found. Make sure the email is correct."});
                return;
            } else if (bcrypt.compareSync(password, user.password)) {
                //const user.username = username
                //const user.email = email;
                const {username, email} = user;
                req.session.currentUser = {username, email}; //creating the property currentUser
                res.redirect('/rooms/list');
            } else {
                res.render('auth/login', {errorMessage: 'Password is not correct.'})
            }
        })
        .catch(err => console.log(err));



    // res.render()
})


//POST logout
router.post("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
            res.redirect("/");
        };
    });
});

module.exports = router;