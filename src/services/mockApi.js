const mockEvents = [
    {
      name: 'India vs Australia',
      status: 'live',
      odds: { India: 1.5, Australia: 2.5 },
      startTime: new Date(),
    },
    {
      name: 'Argentina vs Brazil',
      status: 'upcoming',
      odds: { Argentina: 1.7, Brazil: 2.2 },
      startTime: new Date(Date.now() + 3600000),
    },
  ];
  
  const Event = require('../models/Event');
  
  async function loadMockEvents() {
    const existing = await Event.find();
    if (existing.length === 0) {
      await Event.insertMany(mockEvents);
      console.log('Mock events inserted');
    }
  }
  
  module.exports = { loadMockEvents };