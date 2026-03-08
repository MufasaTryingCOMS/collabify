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
const taskRoutes = require('./routes/tasks');
const commentRoutes = require('./routes/comments');

app.use('/api/auth', authRoutes);
app.use('/api/workspaces', workspaceRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/comments', commentRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error('DB Error:', err));