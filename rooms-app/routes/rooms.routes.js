const express = require('express');
const router = express.Router();

const User = require('../models/User.model');
const Room = require('../models/Room.model');

// const { isLoggedIn, isLoggedOut} = require('../middleware/route-guard');

//1. create new rooms (only when user logged in)
//1a. GET create new rooms
router.get('/create', (req, res, next) => {
    res.render("rooms/create-form");
})

//1b. POST create new rooms
router.post('/create', (req, res, next) => {
    console.log("req.body: ", req.body)
    console.log("req.session: ", req.session)
    const {name, description, imageUrl} = req.body;
    const {userId} = req.session;

    Room.create({
        name,
        description,
        imageUrl,
        creator: userId
    })
    .then(() => res.redirect("/rooms/list"))


})


//2. see list of rooms (in any case, logged in or out)
//GET list of rooms
router.get('/list', (req, res, next) => {
    res.render('rooms/list');
})

//3. edit rooms (only when user created them)
//3a. GET edit rooms (only when user created them)

//3b. POST edit rooms (only when user created them)

//4. delete rooms (only when user created them)
//4a. GET delete rooms (only when user created them)

//4b. POST delete rooms (only when user created them)


module.exports = router;