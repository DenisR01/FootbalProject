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
    // let hasUpperCase = false;
    // if (!password) {
    //   return res.status(400).send({
    //     message: 'Password is required',
    //   });
    // }
  
    // const isLongEnough = password.length >= 8;
    // for (let i = 0; i < password.length; i++) {
    //   const char = password[i];

    //   // Check for uppercase letter
    //   if (char >= 'A' && char <= 'Z') {
    //       hasUpperCase = true;
    //   }
  
    // if (!isLongEnough || !hasUpperCase) {
    //   return res.status(400).send({
    //     message: 'Password must be at least 8 characters long and should have at least one capital letter!',
    //   });
    // }

  if (!req.body.password || req.body.password.length < 8) {
     return res.status(400).send({
        message: 'Please enter a password with min. 8 chars',
    });
  }
  next();
}


module.exports = {verifyToken, validateRegister};