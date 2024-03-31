require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');;
const dbConfig = require('./config/db');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const authRoute = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');


const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = process.env.PORT || 3001;

io.on('connection', (socket) => {
  // Emit event when a participant joins the room
socket.on('participantJoined', (roomId, participant) => {
  io.to(roomId).emit('participantJoined', participant);
});

// Emit event when the event starts
socket.on('eventStart', (roomId) => {
  io.to(roomId).emit('eventStart');
});

// Emit event when the event ends
socket.on('eventEnd', (roomId) => {
  io.to(roomId).emit('eventEnd');
});

// Emit event when winner is announced
socket.on('winnerAnnounced', (roomId, winner) => {
  io.to(roomId).emit('winnerAnnounced', winner);
});

});


// Allow all origins during development, replace with specific origin in production
app.use(cors());

mongoose.connect(dbConfig.url, dbConfig.options)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

app.use(bodyParser.json());

// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to Spinflame! Your source for Events.');
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/events", roomRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});