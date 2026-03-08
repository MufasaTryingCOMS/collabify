console.log('step 1 - starting');
const express = require('express');
console.log('step 2 - express loaded');
const mongoose = require('mongoose');
console.log('step 3 - mongoose loaded');
const cors = require('cors');
require('dotenv').config();
console.log('step 4 - env loaded, MONGO_URI:', process.env.MONGO_URI);

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
console.log('step 5 - auth routes loaded');
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error('DB Error:', err));