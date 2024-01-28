const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(400).send({
      message: 'Your session is not valid!',
    });
  }
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, 'secret-key');
    req.userData = decoded;
    next();
  } catch (err) {
    return res.status(400).send({
      message: 'Your session is not valid!',
    });
  }

}

function validateRegister(req, res, next) {
    const password = req.body.password;
    if (!password) {
      return res.status(400).send({
        message: 'Password is required',
      });
    }
  
    const isLongEnough = password.length >= 8;
  
    if (!isLongEnough) {
      return res.status(400).send({
        message: 'Password must be at least 8 characters long!',
      });
    }
    next();
  }

module.exports = {verifyToken, validateRegister};