const express = require('express');
const router = express.Router();

const User = require('../models/User.model');
const Room = require('../models/Room.model');

const { isLoggedIn, isLoggedOut} = require('../middleware/route-guard');



module.exports = router;