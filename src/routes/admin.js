// // routes/admin.js
// const express = require('express');
// const router = express.Router();
// const { settleTrades } = require('../services/tradeSettlement');
// const { authenticateJWT, authorizeAdmin } = require('../middleware/auth');

// router.post('/settle-trades', authenticateJWT, authorizeAdmin, async (req, res) => {
//   try {
//     await settleTrades();
//     res.status(200).json({ message: 'Trades settled successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error settling trades', error: err.message });
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Trade = require('../models/Trade');
const User = require('../models/User');
const { settleTrades } = require('../services/tradeSettlement');
const { emitEventUpdate, emitTradeUpdate } = require('../utils/socket');

// GET /admin/events - View all events (including settled ones)
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /admin/trades - View all trades including settled ones
router.get('/trades', async (req, res) => {
  try {
    const trades = await Trade.find().populate('user').populate('event');
    res.json(trades);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /admin/users - View all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /admin/events - Create new event manually
router.post('/events', async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    emitEventUpdate(event);
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /admin/settle-trades - Manually trigger trade settlement
router.post('/settle-trades', async (req, res) => {
  try {
    const settledTrades = await settleTrades();
    // emit update for each settled trade
    settledTrades.forEach(trade => emitTradeUpdate(trade));
    res.json({ message: 'Trades settled successfully', settled: settledTrades });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;