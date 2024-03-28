const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//determines the complexity of the hashing algorithm.
const SALT_ROUNDS = 10; 

// Define User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    default: "https://placehold.co/500x500",
  },
  bio: String,
  profilePicture: String,
  socialLinks: {
    type: Map,
    of: String
  },
  role: {
    type: String,
    enum: ['creator', 'user'],
    default: 'user'
  },
  isPro: {
    type: Boolean,
    default: false
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  emailVerificationExpire: Date,
  // Timestamps for createdAt and updatedAt
}, { timestamps: true });

// Pre-save hook to hash password before saving
userSchema.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashedPassword = await bcrypt.hash(this.password, SALT_ROUNDS);
    this.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword, next) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    return next(error);
  }
};

// Create User model
const User = mongoose.model('User', userSchema);

module.exports = User;