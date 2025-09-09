const User = require('../models/user');

module.exports.index = async (req, res, next) => {
    try {
        const users = await User.find({}, { username: 1, avatar: 1, bio: 1 })
            .sort({ username: 1 })
            .lean();
            res.render('users/index', {
            title: 'Our Community',
            users,
        });
    } catch (err) {
        next(err);
    }
};