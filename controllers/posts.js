const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render('content/index.ejs', {
      posts: currentUser.posts,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.get('/new', async (req, res) => {
  res.render('posts/new.ejs');
});

router.get('/:postId', async (req, res) => {
  try {           
    const currentUser = await User.findById(req.session.user._id);
    const post = currentUser.posts.id(req.params.postId);  
    res.render('posts/show.ejs', {   
      content: content,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.get('/:postId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const post = currentUser.posts.id(req.params.postId);
    res.render('content/edit.ejs', {
      post: post,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

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

router.delete('/:postId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);  
    currentUser.posts.id(req.params.postId).deleteOne();
    await currentUser.save();   
    res.redirect(`/users/${currentUser._id}/posts`); 
  } catch (error) {
    console.log(error);
    res.redirect('/'); 
  }
});

module.exports = router;