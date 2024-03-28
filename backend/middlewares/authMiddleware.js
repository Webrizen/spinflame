require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware function to authenticate and authorize access to protected routes
const authMiddleware = async (req, res, next) => {
  // Extract JWT token from request headers
  const authorizationHeader = req.header('Authorization');

  if (!authorizationHeader) {
    return res.status(400).json({ message: 'No authorization header provided' });
  }

  const token = authorizationHeader.replace("Bearer", "").trim();

  // Check if token is provided
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Proceed to next middleware or route handler
    next();
  } catch (error) {
    console.error('Error authenticating user:', error);

    if (error.message === 'invalid token' || error.message === 'jwt expired') {
      return res.status(401).json({ message: 'Invalid or expired token, authorization denied' });
    } else {
      return res.status(400).json({ message: 'Error verifying token, authorization denied' });
    }
  }
};

module.exports = authMiddleware;