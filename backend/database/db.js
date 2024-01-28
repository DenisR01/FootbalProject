const admin = require('firebase-admin');

const serviceAccount = require('../tic2024-ee472-firebase-adminsdk-r90vs-b0a444a151.json'); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

console.log('Firebase initialized successfully!');

const db = admin.firestore();

module.exports = {db}