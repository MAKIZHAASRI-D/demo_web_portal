// server/server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const dropdownRoutes = require('./routes/dropdowns');
const adduser=require('./routes/adduser');
const reportRoutes=require('./routes/report');
//const speechRoutes = require('./routes/speech');



require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(dropdownRoutes);
app.use(adduser);
app.use(require('./routes/disaproduction'));
app.use('/api',reportRoutes);
//app.use('/', speechRoutes);
mongoose.connect('mongodb://localhost:27017/user', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
app.post('/api/login', async (req, res) => {
  try{
  const { username, password } = req.body;
  
  const user = await User.findOne({ username });
  
  if (!user) return res.status(401).json({ message: 'Invalid username' });
  
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Invalid password' });
  
  const token = jwt.sign({ username: user.username, id: user._id ,role:user.role}, JWT_SECRET, {
    expiresIn: '1h',
  });
  res.json({ token });
}
catch(error){
  console.error('Login error:', error); 
  res.status(500).json({ message: `${error}`});
}
});


app.get('/api/profile', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});
//app.use('/api/dropdowns',dropdownRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  

}
);
