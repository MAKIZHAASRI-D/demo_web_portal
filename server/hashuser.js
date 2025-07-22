
// hashUser.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user');

mongoose.connect('mongodb://localhost:27017/user', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createUser = async () => {
  const hashedPassword = await bcrypt.hash('op1', 10);

  const newUser = new User({
    username: 'op1',
    password: hashedPassword,
    email: 'example@example.com',
    role: 'user', // or 'user'
  });

  await newUser.save();
  console.log('User created');
  mongoose.disconnect();
};

createUser();
