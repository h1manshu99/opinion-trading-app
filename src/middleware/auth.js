// middleware/auth.js
const jwt = require('jsonwebtoken');

function authenticateJWT(req, res, next) {
    console.log("woejwejqwoj", req.headers.authorization)
  const token = req.headers.authorization?.split(' ')[1];
  console.log("welnwelw", token)
  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'opinion-trades', (err, user) => {
    if (err) 
       {console.error("opopopopopo", err)
        return res.sendStatus(403)}
    req.user = user;
    next();
  });
}

function authorizeAdmin(req, res, next) {
  if (req.user.role !== 'admin') return res.sendStatus(403);
  next();
}

module.exports = { authenticateJWT, authorizeAdmin };
