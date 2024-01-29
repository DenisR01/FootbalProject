const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const {verifyToken} = require('../forAuthentifications/authentificationRequirements.js')

const db = admin.firestore();

router.get('/', async (req, res) => {
  try {
    const footbalPlayersSnapshot = await db.collection('footbalPlayers').get();
    const footbalPlayers = [];
    footbalPlayersSnapshot.forEach((doc) => {
      footbalPlayers.push({
        id: doc.id,
        ...doc.data()
      });
    });
    res.json(footbalPlayers);
  } catch (error) {
    console.error('Error getting footbal Player:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const footbalPlayersId = req.params.id;
    const footbalPlayersDoc = await db.collection('footbalPlayers').doc(footbalPlayersId).get();

    if (!footbalPlayersDoc.exists) {
      return res.status(404).send('Footbal Player not found');
    }

    const footbalPlayerData = {
      id: footbalPlayersDoc.id,
      ...footbalPlayersDoc.data()
    };

    res.json(footbalPlayerData);
  } catch (error) {
    console.error('Error getting footbal Player by ID:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/', verifyToken, async(req,res)=> {
  try{
    let docRef=db.collection('footbalPlayers').doc();
    const clubId = req.body.clubId;
    let footbalClubDataData = 
    { 
        clubName: null,
        clubFoundingDate: null,
        clubLocation: null
    };

    if (clubId) {
      const footbalClubDoc = await db.collection('footbalClubs').doc(clubId).get();

      if (footbalClubDoc.exists) {
        footbalClubDataData= {
          clubName: footbalClubDoc.data().clubName,
          clubFoundingDate: footbalClubDoc.data().foundingDate,
          clubLocation: footbalClubDoc.data().location,
        }
      }
    }
    
    if(!req.body.name || !req.body.position || !req.body.marketValue){
      res.json({message: 'Footbal Player data incomplete.'});
    }

    await docRef.set({
      name: req.body.name,
      position: req.body.position,
      marketValue: req.body.marketValue,
        
      clubId,
      ...footbalClubDataData
    })

    res.json({message: 'Footbal Player added successfully'});

  } catch(error){
    console.error('Unable to add new Footbal Player:', error);
    res.status(500).send('Unable to add new Footbal Player.');
  }
})

router.put('/:id', verifyToken, async(req,res)=> {
  try{
    const id = req.params.id;
    let docRef = db.collection('footbalPlayers').doc(id);

    if(!req.body.name || !req.body.position || !req.body.marketValue){
      res.json({message: 'Footbal Player data incomplete.'});
    }
    
    await docRef.update({
      name: req.body.name,
      position: req.body.position,
      marketValue: req.body.marketValue,
      clubId: req.body.clubId
    })

  } catch(error){
    console.error('Unable to update the Footbal Player:', error);
    res.status(500).send('Unable to update the Footbal Player.');
  }
})

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const footbalPlayersId = req.params.id;
    const footbalPlayersDoc = db.collection('footbalPlayers').doc(footbalPlayersId);
    const snapshot = await footbalPlayersDoc.get();

    if (!snapshot.exists) {
      return res.status(404).send('Footbal Player not found');
    }

    await footbalPlayersDoc.delete();
    res.send('Footbal Player deleted successfully');
  } catch (error) {
    console.error('Error deleting Footbal Player:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;