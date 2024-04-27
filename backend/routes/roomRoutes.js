const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const User = require('../models/User');

// Create a new room
router.post('/rooms', async (req, res) => {
  try {
    const { name, creator, maxParticipants, description, startDate, endDate } = req.body;
    const room = new Room({ name, creator, maxParticipants, description, startDate, endDate });
    await room.save();
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

// Get rooms by user ID
router.get('/rooms/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const rooms = await Room.find({ creator: userId });
    res.json(rooms);
  } catch (error) {
    console.error('Error fetching rooms by user ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET participants for a specific event room
router.get('/:eventId/participants', async (req, res) => {
  try {
    const eventId = req.params.eventId;

    // Find the event room by ID
    const room = await Room.findById(eventId);

    if (!room) {
      return res.status(404).json({ message: 'Event room not found' });
    }

    // Extract participant names from the room's participants array
    const participants = room.participants.map(participant => participant.name);

    res.json({ participants });
  } catch (error) {
    console.error('Error fetching participants:', error);
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
    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error('Error deleting room:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;