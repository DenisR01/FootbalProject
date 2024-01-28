const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {db} = require('./database/db.js')

//const port = 3000;

const app = express();

const footbalClubsRoutes = require('./routes/footbalClubs.js');
const footbalPlayersRoutes = require('./routes/footbalPlayers.js');
const authRoutes = require('./routes/authentification.js');


app.use(cors());
app.use(bodyParser.json());
app.use('/api', authRoutes); // Mount auth routes at /ap
app.use('/api/footbalClubs', footbalClubsRoutes);
app.use('/api/footbalPlayers', footbalPlayersRoutes);
app.use((req, res) => {
  res.status(404).send('Page not found');
});

const port = process.env.PORT || 3000; // Use the environment port or default to 3000
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;