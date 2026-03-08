const express = require('express');

const mongoose = require('mongoose');

const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const workspaceRoutes = require('./routes/workspaces');
const goalRoutes = require('./routes/goals');

app.use('/api/auth', authRoutes);
app.use('/api/workspaces', workspaceRoutes);
app.use('/api/goals', goalRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error('DB Error:', err));