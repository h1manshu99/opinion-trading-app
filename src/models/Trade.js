const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  option: String,
  amount: Number,
  status: { type: String, enum: ['pending', 'won', 'lost'], default: 'pending' },
});

module.exports = mongoose.model('Trade', tradeSchema);