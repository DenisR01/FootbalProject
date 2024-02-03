const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const {verifyToken} = require('../forAuthentifications/authentificationRequirements.js')

const db = admin.firestore();

router.get('/', async (req, res) => {
  try {
    const footbalClubsSnapshot = await db.collection('footbalClubs').get();
    const footbalClubs = [];
    footbalClubsSnapshot.forEach((doc) => {
      footbalClubs.push({
        id: doc.id,
        ...doc.data()
      });
    });
    res.json(footbalClubs);
  } catch (error) {
    console.error('Error getting projects:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const footbalClubId = req.params.id;
    const footbalClubDoc = await db.collection('footbalClubs').doc(footbalClubId).get();

    if (!footbalClubDoc.exists) {
      return res.status(404).send('footbal Club not found!!');
    }

    const footbalClubData = {
      id: footbalClubDoc.id,
      ...footbalClubDoc.data()
    };

    res.json(footbalClubData);
  } catch (error) {
    console.error('Error getting footbal club  by ID:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/:clubName', async (req, res) => {
  try {
    const footbalClubName = req.params.clubName;
    const footbalClubDocs = await db.collection('footbalClubs').doc().get(); //ista cu totate cluburile
    const neededClubName = {};
    for(let club of footbalClubDocs) {
      if (club.clubName !==footbalClubName) {
        return res.status(404).send('footbal Club not found!!');
      }
      else{
          neededClubName = club;
      }

    }
    // if (!footbalClubDoc.exists) {
    //   return res.status(404).send('footbal Club not found!!');
    // }

    // const footbalClubData = {
    //   clubName : neededClubName.clubName,
    //   ...neededClubName.data()
    // };
    if(neededClubName !== null  )
      res.json(neededClubName);
  } catch (error) {
    console.error('Error getting footbal club  by name:', error);
    res.status(500).send('Internal Server Error');
  }
});


router.post('/', verifyToken, async(req,res)=> {
  try{
    let docRef=db.collection('footbalClubs').doc();

    if(!req.body.clubName || !req.body.clubFoundingDate || !req.body.clubFoundingDate) {
      res.json({message:'Footbal Club must contain all data.'})
    }

    await docRef.set({
      clubId: docRef.id,
      clubName: req.body.clubName,
      clubFoundingDate: req.body.clubFoundingDate,
      clubLocation: req.body.clubLocation
    })

    res.json({message: 'Footbal Club added successfully'});

  } catch(error){
    console.error('Unable to add new footbal club:', error);
    res.status(500).send('Unable to push footbal club.');
  }
})

router.put('/:id', verifyToken, async(req,res)=> {
  try{
    const id = req.params.id;
    let docRef = db.collection('footbalClubs').doc(id);

    if(!req.body.clubName || !req.body.clubFoundingDate || !req.body.clubLocation) {
      res.json({message:'Footbal Club must contain all data.'})
    }

    await docRef.update({
      clubName: req.body.clubName,
      clubFoundingDate: req.body.clubFoundingDate,
      clubLocation: req.body.clubLocation
    })

    
  } catch(error){
    console.error('Unable to update the footbal club:', error);
    res.status(500).send('Unable to update the footbal club.');
  }
})

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const clubId = req.params.id;

    const footbalPlayerSnapshot = await db.collection('footbalPlayers').where('clubId', '==', clubId).get();
    const updatedPromises = [];
    footbalPlayerSnapshot.forEach((doc)=> {
      updatedPromises.push(doc.ref.update({
        clubId: null,
        clubName: 'Free agent',
        clubFoundingDate: null,
        clubLocation: null
      }));
    });
    await Promise.all(updatedPromises);

    const footbalClubDoc = db.collection('footbalClubs').doc(clubId);
    const snapshot = await footbalClubDoc.get();
    if (!snapshot.exists) {
      return res.status(404).send('Footbal club not found');
    }

    await footbalClubDoc.delete();
    res.send('Footbal Club deleted successfully');
  } catch (error) {
    console.error('Error deleting Footbal Club:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;