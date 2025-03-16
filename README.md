# Opinion Trading App - Backend

This is the backend for an **opinion trading platform** where users can place trades on live sports events. It features real-time updates, role-based access, admin controls, and integration with a sports data provider.

---

## Features

- JWT-based authentication for users and admins
- Fetches live sports data from third-party APIs
- Users can place trades on events
- Admin can create events and manually settle trades
- Real-time event and trade updates with WebSockets
- Role-based access control
- MongoDB used for persistent storage
- Structured and modular Express.js codebase

---

## Tech Stack

- Node.js with Express.js
- MongoDB with Mongoose
- Socket.io for WebSocket support
- JWT for secure authentication
- Winston for logging

---

## Project Structure

```
├── models/               # MongoDB schemas
│   ├── User.js
│   ├── Event.js
│   └── Trade.js
├── routes/               # Express routes
│   ├── auth.js
│   ├── events.js
│   ├── users.js
│   ├── trades.js
│   └── admin.js
├── middleware/           # Auth and error handling middleware
├── services/             # Business logic (trade settlement)
├── utils/                # Logger, WebSocket utility
├── .env                  # Environment variables
├── server.js             # App entry point
```

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/opinion-trading-backend.git
cd opinion-trading-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/opinion-trading
JWT_SECRET=your_jwt_secret
SPORTS_API_KEY=your_api_key
SPORTS_API_URL=https://www.thesportsdb.com/api/v1/json/1/
```

### 4. Run the App

```bash
npm start
```

---

## Authentication

- Register: `POST /auth/register`
- Login: `POST /auth/login`
- JWT token returned in response, pass as `Authorization: Bearer <token>`

---

## User Routes (Protected)

- `GET /my-trades` - View your trades
- `GET /my-balance` - View wallet balance
- `PUT /update-profile` - Update user details
- `POST /trade` - Place a trade

---

## Admin Routes (Protected, Role-based)

- `GET /admin/events` - View all events
- `POST /admin/events` - Create an event
- `GET /admin/trades` - View all trades
- `POST /admin/settle-trades` - Settle trades manually
- `GET /admin/users` - View user list

---

## WebSocket

- Connect to: `ws://localhost:3000`
- Events emitted:
  - `eventUpdate` - Event updates
  - `tradeUpdate` - Trade settlement updates

---

## Database Models

- **User**: username, password, balance, role, email
- **Event**: title, description, odds, status, outcome
- **Trade**: user, event, amount, prediction, status, result

---

## API Integration

- Third-party API used for sports event data (e.g. TheSportsDB)
- Fetched data is stored and used for trading

---

## Admin Panel API

- Fully protected and restricted to admins
- Allows event creation, trade monitoring, and settlement

---

## Trade Execution & Settlement

- Users place trades on live events
- Trades are stored and settled based on event outcome
- User balance updated accordingly

---

## Logging & Error Handling

- Centralized logging with Winston
- Consistent error responses using middleware

---

## Deployment

Can be deployed on:
- Heroku
- Render
- AWS EC2
- Railway