const express = require('express');
const Comment = require('../models/Comment');
const auth = require('../middleware/auth');

const router = express.Router();

// CREATE comment
router.post('/', auth, async (req, res) => {
  try {
    const { text, goal, task } = req.body;
    const comment = new Comment({
      text,
      goal,
      task,
      createdBy: req.user.id
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all comments for a goal
router.get('/goal/:goalId', auth, async (req, res) => {
  try {
    const comments = await Comment.find({ goal: req.params.goalId })
      .populate('createdBy', 'username');
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all comments for a task
router.get('/task/:taskId', auth, async (req, res) => {
  try {
    const comments = await Comment.find({ task: req.params.taskId })
      .populate('createdBy', 'username');
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE comment
router.delete('/:id', auth, async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;