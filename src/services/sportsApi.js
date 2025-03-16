// const axios = require('axios');
// const Event = require('../models/Event');

// async function fetchLiveEvents(io) {
//   try {
//     const response = await axios.get('https://api.the-odds-api.com/v4/sports/soccer_epl/odds/?regions=eu&apiKey=f4421af7192d5a12161682f9be42245b');
//     const data = response.data;

//     for (const match of data) {
//       const existing = await Event.findOne({ name: match.home_team + ' vs ' + match.away_team });
//       if (!existing) {
//         const event = new Event({
//           name: match.home_team + ' vs ' + match.away_team,
//           status: 'upcoming',
//           odds: {
//             [match.home_team]: match.bookmakers[0]?.markets[0]?.outcomes[0]?.price,
//             [match.away_team]: match.bookmakers[0]?.markets[0]?.outcomes[1]?.price
//           },
//           startTime: new Date(match.commence_time)
//         });
//         await event.save();
//         if (io) io.emit('eventUpdate', event);
//       }
//     }
//   } catch (error) {
//     console.error('Error fetching sports data:', error.message);
//   }
// }

// function fetchLiveEventsPeriodically(io) {
//   fetchLiveEvents(io);
//   setInterval(() => fetchLiveEvents(io), 5 * 60 * 1000); // every 5 minutes
// }

// module.exports = { fetchLiveEventsPeriodically };


const axios = require('axios');
const Event = require('../models/Event');

async function fetchLiveEvents(io) {
  try {
    console.log("events being fetched automatically");
    const response = await axios.get('https://api.the-odds-api.com/v4/sports/soccer_epl/odds/?regions=eu&apiKey=f4421af7192d5a12161682f9be42245b');
    const data = response.data;
    console.log("data from events ---", data)
    for (const match of data) {
      const existing = await Event.findOne({ name: match.home_team + ' vs ' + match.away_team });
      if (!existing) {
        const event = new Event({
          name: match.home_team + ' vs ' + match.away_team,
          status: 'upcoming',
          odds: {
            [match.home_team]: match.bookmakers[0]?.markets[0]?.outcomes[0]?.price,
            [match.away_team]: match.bookmakers[0]?.markets[0]?.outcomes[1]?.price
          },
          startTime: new Date(match.commence_time)
        });
        await event.save();
        if (io) io.emit('eventUpdate', event);
      }
    }
  } catch (error) {
    console.error('Error fetching sports data:', error.message);
  }
}

function fetchLiveEventsPeriodically(io) {
  fetchLiveEvents(io);
  setInterval(() => fetchLiveEvents(io), 1 * 60 * 1000); // every 5 minutes
}

module.exports = { fetchLiveEventsPeriodically };