const express = require('express');
const Workspace = require('../models/Workspace');
const auth = require('../middleware/auth');

const router = express.Router();

// CREATE workspace
router.post('/', auth, async (req, res) => {
  try {
    const { name, description } = req.body;
    const workspace = new Workspace({
      name,
      description,
      owner: req.user.id,
      members: [req.user.id]
    });
    await workspace.save();
    res.status(201).json(workspace);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all workspaces for logged in user
router.get('/', auth, async (req, res) => {
  try {
    const workspaces = await Workspace.find({ members: req.user.id });
    res.json(workspaces);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single workspace
router.get('/:id', auth, async (req, res) => {
  try {
    const workspace = await Workspace.findById(req.params.id);
    if (!workspace) return res.status(404).json({ message: 'Workspace not found' });
    res.json(workspace);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE workspace
router.put('/:id', auth, async (req, res) => {
  try {
    const workspace = await Workspace.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!workspace) return res.status(404).json({ message: 'Workspace not found' });
    res.json(workspace);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE workspace
router.delete('/:id', auth, async (req, res) => {
  try {
    await Workspace.findByIdAndDelete(req.params.id);
    res.json({ message: 'Workspace deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;