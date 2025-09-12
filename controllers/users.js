const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', async (req, res, next) => {
    try {
        const users = await User.find({}, { username: 1 })
        .sort({ username: 1 })
        .lean();
        res.render('users/index', {
        title: 'Explore tellin',
        users,
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;