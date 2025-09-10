const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({ 
  name: { 
    type: String,
    ref: 'User',
    required: true,
  },
  description: {
    type: String,
  },
  content: {
    type: String,
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
  post: {
    type: [postSchema],
    default: []
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;