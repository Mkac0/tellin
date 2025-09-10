const express = require('express');
const router = express.Router({ mergeParams: true });
const User = require('../models/user.js');

// index
router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    res.render('posts/index.ejs', {
      user: user,
      posts: user.posts || [],
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// new
router.get('/new', async (req, res) => {
    const user = await User.findById(req.session.user._id);
    res.render('posts/new.ejs', {
        user
    });
});

// edit
router.get('/:postId/edit', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const post = user.posts.id(req.params.postId);
    res.render('posts/edit.ejs', {
      user, post
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// show
router.get('/:postId', async (req, res) => {
  try {           
    const user = await User.findById(req.session.user._id);
    const post = user.posts.id(req.params.postId);  
    res.render('posts/show.ejs', {   
      user: user, post
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// create
router.post('/', async (req, res) => {
  try {   
    const user = await User.findById(req.session.user._id);
    user.posts.push(req.body);
    await user.save(); 
    res.redirect(`/users/${req.params.userId}/posts`); 
  } catch (error) { 
    console.log(error);
    res.redirect(`/users/${req.params.userId}/posts`);
  }
});

// update
router.put('/:postId', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const post = user.posts.id(req.params.postId);
    post.set(req.body);      
    await user.save();       
    res.redirect(`/users/${req.params.userId}/posts/${req.params.postId}`);
  } catch (error) {
    console.log(error);
    res.redirect(`/users/${req.params.userId}/posts`);
  }
});

// delete
router.delete('/:postId', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);  
    user.posts.id(req.params.postId)?.deleteOne();
    await user.save();   
    res.redirect(`/users/${req.params.userId}/posts`); 
  } catch (error) {
    console.log(error);
    res.redirect(`/users/${req.params.userId}/posts`); 
  }
});

module.exports = router;