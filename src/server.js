const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const eventRoutes = require('./routes/events');
const tradeRoutes = require('./routes/trades');
const adminRoutes = require('./routes/admin');
const { authenticateJWT, authorizeAdmin } = require('./middleware/auth');
const { fetchLiveEventsPeriodically } = require('./services/sportsApi');
const { settleTradesPeriodically } = require('./services/tradeSettlement');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*', methods: ['GET', 'POST'] } });

mongoose.connect('mongodb+srv://hemuchauhan31:iJECvQUyghppjsLK@cluster0.5ecyw.mongodb.net/')
.then(() => {
  console.log('✅ MongoDB connected successfully');
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

app.use(cors());
app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/events', eventRoutes);
app.use('/trades', tradeRoutes);

app.use('/admin', authenticateJWT, authorizeAdmin, adminRoutes);


io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
});

app.set('io', io); // Attach io to app

fetchLiveEventsPeriodically(io);

settleTradesPeriodically();

server.listen(3000, () => console.log('Server running on port 3000'));