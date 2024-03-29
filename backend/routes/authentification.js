const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {validateRegister} = require('../forAuthentifications/authentificationRequirements.js')

const db = admin.firestore();

router.post('/register', validateRegister, async(req,res) => {
  try {
    const {name,email, password} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    
    let docRef=db.collection('users').doc();

    await docRef.set({
      name: name,
      email: email,
      password: hashedPassword,
    })

    return res.status(201).send({
      message: 'You have registered succesfully!',
    });

  } catch(error){
    console.error('Unable to add new user:', error);
    return res.status(500).send('Unable to add new user.');
  }
});

router.post('/login', async(req, res)=>{
  const {email, password } = req.body;

  try {
    const docRef = db.collection('users');
    const userQuery = await docRef.where('email', '==', email).get();

    if (userQuery.empty) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const user = userQuery.docs[0].data();

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const token = jwt.sign({ userId: user.email }, 'secret-key', {
      expiresIn: '24h',
    });

    return res.status(200).send({
      message: 'You have succesfully logged in!',
      token,
      user: user
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }

})

module.exports = router;