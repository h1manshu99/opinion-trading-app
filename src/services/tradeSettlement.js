const Trade = require('../models/Trade');
const Event = require('../models/Event');
const User = require('../models/User');

async function settleTrades() {
  try {
    const completedEvents = await Event.find({ status: 'completed' });

    for (const event of completedEvents) {
      const unsettledTrades = await Trade.find({ event: event._id, status: 'pending' });

      for (const trade of unsettledTrades) {
        const user = await User.findById(trade.user);

        if (event.result === trade.prediction) {
          trade.status = 'won';
          user.balance += trade.amount * 2;
        } else {
          trade.status = 'lost';
        }

        await trade.save();
        await user.save();
      }
    }
  } catch (err) {
    console.error('Error settling trades:', err.message);
  }
}

function settleTradesPeriodically() {
  settleTrades();
  setInterval(() => settleTrades(), 10 * 60 * 1000); // every 10 minutes
}

module.exports = { settleTradesPeriodically };