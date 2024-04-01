const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

module.exports = function(io) {
// Create a new room
router.post('/rooms', async (req, res) => {
  try {
    const { name, creator, maxParticipants, description, startDate, endDate } = req.body;
    const room = new Room({ name, creator, maxParticipants, description, startDate, endDate });
    await room.save();
    // Emit Socket.io event when a new room is created
    io.emit('roomCreated', room);
    res.status(201).json(room);
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all rooms
router.get('/rooms', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get a single room by ID
router.get('/rooms/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findById(id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json(room);
  } catch (error) {
    console.error('Error fetching room by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update a room by ID
router.put('/rooms/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, maxParticipants, description, startDate, endDate } = req.body;
    const updatedRoom = await Room.findByIdAndUpdate(id, { name, maxParticipants, description, startDate, endDate }, { new: true });
    if (!updatedRoom) {
      return res.status(404).json({ message: 'Room not found' });
    }
    // Emit Socket.io event when a room is updated
    io.emit('roomUpdated', updatedRoom);
    res.json(updatedRoom);
  } catch (error) {
    console.error('Error updating room:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a room by ID
router.delete('/rooms/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRoom = await Room.findByIdAndDelete(id);
    if (!deletedRoom) {
      return res.status(404).json({ message: 'Room not found' });
    }
    // Emit Socket.io event when a room is deleted
    io.emit('roomDeleted', id);
    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error('Error deleting room:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

return router;
}