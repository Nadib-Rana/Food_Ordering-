const authMiddleware = require('./authMiddleware');

const adminMiddleware = async (req, res, next) => {
  // First verify auth using existing middleware
  await authMiddleware(req, res, () => {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Admin access required' });
    }
  });
};

module.exports = adminMiddleware;