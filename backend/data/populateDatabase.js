const {db} = require('../database/db.js')
const Chance = require('chance')
const chance=new Chance()

const generateFootbalClubs = (nrOfClubs) => {
  const clubs = [];
  const prefixes = ['FC', 'Real', 'AC', 'Sporting', 'United', 'City', 'Rovers', 'Dynamo', 'Galaxy', 'Racing', 'Wanderers', 'Rangers', 'Dynamo', 'City', 'United', 'Club', 'Athletic', 'FC'];

  for (let i = 0; i < nrOfClubs; i++) {
    const clubId = chance.guid();
    const prefix = chance.pickone(prefixes);
    const city = chance.city();
    const maxDate = new Date(2010, 11, 31); 
    const randomPastDate = chance.date({ max: maxDate })
    const formattedDate = formatDate(randomPastDate);
    const club = {
        clubId: clubId,
        clubName: `${prefix} ${city}`,
        clubFoundingDate: formattedDate, 
        clubLocation: city
    };
    

    clubs.push(club);
  }

  return clubs;
};
function formatDate(date) {
  const d = new Date(date);
  const day = (d.getDate() < 10 ? '0' : '') + d.getDate();
  const month = (d.getMonth() + 1 < 10 ? '0' : '') + (d.getMonth() + 1); // Months are 0-based
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}

const generateFootballPlayers = (nrOfPlayers, clubs) => {
    const footballPlayers = [];
    const positions = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'];

    for (let i = 0; i < nrOfPlayers; i++) {
        const club = chance.pickone(clubs);
        const footballPlayer = {
            name: chance.name(),
            position: chance.pickone(positions),
            marketValue: chance.integer({ min: 300000, max: 100000000 }),
            clubId: club.clubId,
            clubName: club.clubName,
            clubFoundingDate: club.clubFoundingDate,
            clubLocation: club.clubLocation
        };
        footballPlayers.push(footballPlayer);
    }

    return footballPlayers;
};

const generateUsers = (nrOfUsers) => {
    const users = [];
    for (let i = 0; i < nrOfUsers; i++) {
      const user = {
        name: chance.name(),
        email: chance.email(),
        password: 'password' 
      };
      users.push(user);
    }

    return users;
};
const addData = async () => {
  const nrOfClubs = 7;
  const nrOfPlayers = 50;
  const nrOfUsers = 2;

  try {
    const footbalClubs = generateFootbalClubs(nrOfClubs);
    const footbalPlayers = generateFootballPlayers(nrOfPlayers, footbalClubs);
    const users = generateUsers(nrOfUsers);

    const footbalClubsCollectionRef = db.collection('footbalClubs');
    for (const footbalClub of footbalClubs) {
      const footbalClubsRef = footbalClubsCollectionRef.doc(footbalClub.clubId);
      await footbalClubsRef.set(footbalClub);
    }

    const footbalPlayersCollectionRef = db.collection('footbalPlayers');
    for (const footbalPlayer of footbalPlayers) {
      const footbalPlayersDocRef = footbalPlayersCollectionRef.doc();
      await footbalPlayersDocRef.set(footbalPlayer);
    }

    const usersCollectionRef = db.collection('users');
    for (const user of users) {
      const userDocRef = usersCollectionRef.doc();
      await userDocRef.set(user);
    }

    console.log('Data added successfully.');
  } catch (error) {
    console.error('Error adding data:', error);
  }
};

addData();



