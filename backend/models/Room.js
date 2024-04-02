const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  participants: [{
    name: {
      type: String,
    }
  }],
  maxParticipants: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  winner: {
    name: {
      type: String
    },
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
  },
}, { timestamps: true });

roomSchema.pre('save', async function(next) {
  try {
    // Get the creator of the room
    const creator = await mongoose.model('User').findById(this.creator);

    // Check if the creator is a pro user
    if (creator.isPro) {
      // If the creator is a pro user, set the maximum participant limit to infinity
      this.maxParticipants = Infinity;
    } else {
      // If the creator is not a pro user, use the default maximum participant limit
      this.maxParticipants = 50;
    }

    next();
  } catch (error) {
    next(error);
  }
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;