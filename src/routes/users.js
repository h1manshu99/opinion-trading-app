const express = require('express');
const User = require('../models/User');
const {authenticateJWT} = require('../middleware/auth');
const Trade = require('../models/Trade');
const router = express.Router();

router.get('/me', authenticateJWT, async (req, res) => {
  const user = await User.findById(req.user.id);
  return res.json(user);
});

router.get('/my-trades', authenticateJWT, async (req, res) => {
  try {
    const trades = await Trade.find({ user: req.user.id }).populate('event');
    return res.json(trades);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/my-balance', authenticateJWT, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    return res.json({success: true,  balance: user?.balance || 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/update-profile', authenticateJWT, async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true });
    return res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;