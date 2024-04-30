// authMiddleware.js

const passport = require('passport');

const authenticate = passport.authenticate('jwt', { session: false });

const authorizeUser = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  // Add logic for role-based access control if needed
  next();
};

module.exports = { authenticate, authorizeUser };
