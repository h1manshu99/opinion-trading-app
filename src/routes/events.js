const express = require('express');
const Event = require('../models/Event');
const {authenticateJWT} = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

router.post('/', authenticateJWT, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  const event = new Event(req.body);
  await event.save();
  req.app.get('io').emit('eventUpdate', event);
  res.status(201).json(event);
});

module.exports = router;