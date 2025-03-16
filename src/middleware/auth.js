// middleware/auth.js
const jwt = require('jsonwebtoken');

function authenticateJWT(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'opinion-trades', (err, user) => {
    if (err) 
       {
        console.error("Error in token verification-", err)
        return res.sendStatus(403)
      }
    req.user = user;
    next();
  });
}

function authorizeAdmin(req, res, next) {
  if (req.user.role !== 'admin') return res.sendStatus(403);
  next();
}

module.exports = { authenticateJWT, authorizeAdmin };
