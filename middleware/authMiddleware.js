// Middleware to check user role from x-user-role header
const checkRole = (req, res, next) => {
  const userRole = req.headers['x-user-role'];
  const userId = req.headers['x-user-id'];

  if (!userRole) {
    return res.status(400).json({
      success: false,
      message: 'Header x-user-role is required',
    });
  }

  if (!['admin', 'user'].includes(userRole)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid role. Allowed: admin or user',
    });
  }

  req.userRole = userRole;
  req.userId = userId || null;

  next();
};

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin role required',
    });
  }
  next();
};

// Middleware to check if user is regular user
const isUser = (req, res, next) => {
  if (req.userRole !== 'user') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. User role required',
    });
  }

  if (!req.userId) {
    return res.status(400).json({
      success: false,
      message: 'Header x-user-id is required for user role',
    });
  }

  next();
};

module.exports = {
  checkRole,
  isAdmin,
  isUser,
};
