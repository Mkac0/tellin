const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const router = express.Router({ mergeParams: true });
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');

// ------     Middleware      -------
const authController = require('./controllers/auth.js');
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');
const postsController = require('./controllers/posts.js');

const port = process.env.PORT ? process.env.PORT : '3000';

const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passUserToView);

// ------     Routes     ------
app.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect(`/users/${req.session.user._id}/posts`);
  } else {
    res.render('index.ejs');
  }
});

app.use('/users/:userId/posts', postsController);
app.use('/posts', postsController);

app.use('/auth', authController);
app.use(isSignedIn);

// ------     Listener      ------
app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
