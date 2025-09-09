const express = require('express');
const router = express.Router({ mergeParams: true });
const User = require('../models/user.js');

// index
router.get('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render('content/index.ejs', {
      posts: currentUser?.posts || [],
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// new
router.get('/new', async (req, res) => {
  res.render('posts/new.ejs');
});

// show
router.get('/:postId', async (req, res) => {
  try {           
    const currentUser = await User.findById(req.session.user._id);
    const post = currentUser.posts.id(req.params.postId);  
    res.render('posts/show.ejs', {   
      post
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// edit
router.get('/:postId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const post = currentUser.posts.id(req.params.postId);
    res.render('content/edit.ejs', {
      posts
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// create
router.post('/', async (req, res) => {
  try {   
    const currentUser = await User.findById(req.session.user._id);
    currentUser.posts.push(req.body);
    await currentUser.save(); 
    res.redirect(`/users/${currentUser._id}/posts`); 
  } catch (error) { 
    console.log(error);
    res.redirect('/');
  }
});

// update
router.put('/:postId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const post = currentUser.posts.id(req.params.postId);
    post.set(req.body);      
    await currentUser.save();       
    res.redirect(                   
      `/users/${currentUser._id}/posts/${req.params.postId}`
    );
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// delete
router.delete('/:postId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);  
    const post = currentUser.posts.id(req.params.postId);
    if (post) post.deleteOne();
    await currentUser.save();   
    res.redirect(`/users/${currentUser._id}/posts`); 
  } catch (error) {
    console.log(error);
    res.redirect('/'); 
  }
});

module.exports = router;