const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({ 
  name: { 
    type: String, 
    required: true 
  },
  recipe: {
    type: String,
    required: true
  }
});
const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true },
  pantry: { type: [foodSchema]
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
