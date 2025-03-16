const express = require('express');
const Trade = require('../models/Trade');
const User = require('../models/User');
const Event = require('../models/Event');
const {authenticateJWT} = require('../middleware/auth');
const router = express.Router();

router.post('/', authenticateJWT, async (req, res) => {
  const { eventId, option, amount } = req.body;
  const user = await User.findById(req.user.id);
  if (user.balance < amount) return res.status(400).json({ message: 'Insufficient balance' });

  const trade = new Trade({ userId: user._id, eventId, option, amount });
  await trade.save();
  user.balance -= amount;
  await user.save();

  req.app.get('io').emit('tradeUpdate', trade);
  res.status(201).json(trade);
});

module.exports = router;