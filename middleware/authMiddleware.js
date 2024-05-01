const passport = require('passport');

// Middleware to authenticate user using JWT strategy
const authenticate = passport.authenticate('jwt', { session: false });

// Middleware to authorize user
const authorizeUser = (req, res, next) => {
  // Check if user is authenticated
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  // Add logic for role-based access control if needed
  // For example, check user role and restrict access based on roles
  // Example logic: if (req.user.role !== 'admin') { return res.status(403).json({ message: 'Forbidden' }); }
  next(); // Move to the next middleware or route handler
};

module.exports = { authenticate, authorizeUser };
