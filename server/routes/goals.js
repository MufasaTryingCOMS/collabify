const express = require('express');
const Goal = require('../models/Goal');
const auth = require('../middleware/auth');

const router = express.Router();

// CREATE goal
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, workspace } = req.body;
    const goal = new Goal({
      title,
      description,
      workspace,
      createdBy: req.user.id
    });
    await goal.save();
    res.status(201).json(goal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all goals for a workspace
router.get('/:workspaceId', auth, async (req, res) => {
  try {
    const goals = await Goal.find({ workspace: req.params.workspaceId });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE goal
router.put('/:id', auth, async (req, res) => {
  try {
    const goal = await Goal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    res.json(goal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE goal
router.delete('/:id', auth, async (req, res) => {
  try {
    await Goal.findByIdAndDelete(req.params.id);
    res.json({ message: 'Goal deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;