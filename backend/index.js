require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');;
const dbConfig = require('./config/db');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const Room = require('./models/Room');
const User = require('./models/User');
const authRoute = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');


const app = express();
// Allow all origins during development, replace with specific origin in production
app.use(cors());
const server = http.createServer(app);
const frontendOrigin = process.env.FRONTEND || 'http://localhost:3000';
const io = new Server(server, {
  cors: {
    origin: frontendOrigin,
  methods: ["GET", "POST", "PATCH", "DELETE"]
  }
});
const PORT = process.env.PORT || 3001;


app.set('io', io);
io.on('connection', (socket) => {

  console.log("Connection established.");

  // Handle participant joining
  socket.on('participantJoined', async (roomId, participantName) => {
    try {
      // Find the room by ID
      const room = await Room.findById(roomId);
      if (!room) {
        console.error('Room not found');
        return;
      }
  
      // Add the participant to the room
      const participant = { name: participantName, socketId: socket.id };
      room.participants.push(participant);
      // Update the number of participants
      await room.save();
  
      // Set the roomId property for the socket
      socket.roomId = roomId;
  
      // Emit event to notify clients about the updated participant count
      io.emit('participantJoined', participantName, roomId);
    } catch (error) {
      console.error('Error adding participant:', error);
    }
  });

  // Handle participant leaving
  socket.on('disconnect', async () => {
    try {
      const roomId = socket.roomId;
      if (!roomId) {
        console.error('Room ID not found in socket.');
        return;
      }

      // Find the room by ID
      const room = await Room.findById(roomId);
      if (!room) {
        console.error('Room not found');
        return;
      }

      // Get the socket ID of the disconnected participant
      const disconnectedSocketId = socket.id;
      // Find the index of the participant in the room's participants array using the socket ID
      const participantIndex = room.participants.findIndex(participant => participant.socketId === disconnectedSocketId);
      if (participantIndex !== -1) {
        // Remove the participant from the room's participants array
        room.participants.splice(participantIndex, 1);
        // Update the database
        await room.save();

        // Emit event to notify clients about the updated participant count
        io.to(roomId).emit('participantLeft', room.participants.length);
      }
    } catch (error) {
      console.error('Error removing participant:', error);
    }
  });

});

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

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});