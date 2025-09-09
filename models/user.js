const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({ 
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
},
{ _id: true }
);
const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  posts: { 
    type: [postSchema]
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
