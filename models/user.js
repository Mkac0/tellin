const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  content: String,
  image: String, 
  category: {
    type: String,
    enum: ['poem', 'photo', 'story'],
  }
}, { _id: true });

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  posts: { type: [postSchema], default: [] },
  avatar: String,
  bio: String,
});

const User = mongoose.model('User', userSchema);
module.exports = User;