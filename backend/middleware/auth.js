const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

<<<<<<< HEAD
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
=======
  const SECRET = process.env.ACCESS_TOKEN || 'default_jwt_secret_key_change_in_production_12345';
  jwt.verify(token, SECRET, (err, user) => {
>>>>>>> f5a76c9 (final commit)
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

<<<<<<< HEAD
module.exports = { authenticateToken };
=======
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Access denied. Required role: ${roles.join(' or ')}` 
      });
    }
    
    next();
  };
};

module.exports = { 
  authenticateToken, 
  requireRole 
};
>>>>>>> f5a76c9 (final commit)
