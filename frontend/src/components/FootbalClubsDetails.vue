   <!-- <template>
    <div class="footballClub-details-container">
      <h2 class="section-title">Football Club Details</h2>
      <div v-if="footballClubDetails" class="footballClub-details">
        <div class="footballClub-info">
          <h3>{{ footballClubDetails.clubName }}</h3>
          <p class="footballClub-FoundingDate">
            <strong>Founding Date:</strong> {{ footballClubDetails.clubFoundingDate }}
          </p>
          <p class="footballClub-Location">
            <strong>Location:</strong> {{ footballClubDetails.clubLocation }}
          </p>
        </div>
  
        <div class="footballPlayers-section">
          <h3 class="section-title">Football Players</h3>
          <ul class="football-players-list">
            <h3 class="football-players-header">Name - Position - Market Value</h3>
            <li v-for="player in filteredFootballPlayers" :key="player.id" class="football-player">
              {{ player.name }}  -  {{ player.position }}  -   {{ player.marketValue }}
              <div class="action-buttons">
                <button v-if="isAuthenticated" @click="deleteFootballPlayer(player.id)" class="delete-btn">Delete</button>
              </div>
            </li>
          </ul>
  
          <form v-if="isAuthenticated" @submit.prevent="addFootballPlayer" class="add-footballPlayer-form">
            <div class="form-row">
              <div class="form-group">
                <input placeholder="Name" v-model="newFootballPlayer.name" type="text" id="newFootballPlayerName" required>
              </div>
              <div class="form-group">
                <select v-model="newFootballPlayer.position" id="newFootballPlayerPosition" required>
        <option disabled value="">Select position</option>
        <option value="Goalkeeper">Goalkeeper</option>
        <option value="Defender">Defender</option>
        <option value="Midfielder">Midfielder</option>
        <option value="Striker">Striker</option>
      </select>
              </div>
              <div class="form-group">
                <input placeholder="Market Value" v-model="newFootballPlayer.marketValue" @input="checkMarketValue" type="number" id="newFootballPlayerMarketValue" required>

              </div>
            </div>
            <button type="submit" class="add-btn">Add</button>
          </form>
  
          <button v-if="isAuthenticated" @click="toggleEditForm" class="edit-btn">Edit Football Club</button>
          <form v-if="isEditing" @submit.prevent="editFootballClub" class="edit-footballClub-form">
            <div class="form-group">
              <label for="editFootballClubName">Name:</label>
              <input v-model="editedFootbalClub.clubName" type="text" id="editFootballClubName" required>
            </div>
            <div class="form-group">
              <label for="editFootballClubFoundingDate">Founding Date:</label>
              <input v-model="editedFootbalClub.clubFoundingDate" type="date" id="editFootballClubFoundingDate" required>
            </div>
            <div class="form-group">
              <label for="editFootballClubLocation">Location:</label>
              <input v-model="editedFootbalClub.clubLocation" type="text" id="editFootballClubLocation" required>
            </div>
            <button type="submit" class="add-btn">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  </template> -->

  <template>
    <v-container class="footballClub-details-container">
      <v-row>
        <v-col cols="12">
          <h2 class="section-title">Football Club Details</h2>
  
          <v-card v-if="footballClubDetails" class="footballClubDetails">
            <v-card-title>{{ footballClubDetails.clubName }}</v-card-title>
            <v-card-text>
              <p><strong>Founding Date:</strong> {{ footballClubDetails.clubFoundingDate }}</p>
              <p><strong>Location:</strong> {{ footballClubDetails.clubLocation }}</p>
            </v-card-text>
  
            <v-divider class="footballClubDetails"></v-divider>
  
            <div class="footballPlayers-section">
              <h3>Football Players</h3>
              <v-list>
                <v-list-item v-for="player in filteredFootballPlayers" :key="player.id">
                  <v-list-item-title>{{ player.name }} - {{ player.position }} - {{formatMarketValue(player.marketValue) }}</v-list-item-title>
                  <v-list-item-action v-if="isAuthenticated">
                    <v-btn  color="red" @click="deleteFootballPlayer(player.id)">
                      Delete Player
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
  
              <v-form v-if="isAuthenticated" @submit.prevent="addFootballPlayer">
                <v-text-field v-model="newFootballPlayer.name" label="Name" required></v-text-field>
                <v-select 
                  v-model="newFootballPlayer.position" 
                  :items="['Goalkeeper', 'Defender', 'Midfielder', 'Striker']" 
                  label="Select position" 
                  required
                ></v-select>
                <v-text-field 
                  type="number" 
                  v-model="newFootballPlayer.marketValue" 
                  label="Market Value" 
                  required
                ></v-text-field>
                <v-btn type="submit" color="green-darken-4">Add</v-btn>
              </v-form>
  
              <v-btn v-if="isAuthenticated" @click="toggleEditForm" color="green-darken-4">Edit Football Club</v-btn>
              <v-form v-if="isEditing" @submit.prevent="editFootballClub">
                <v-text-field v-model="editedFootbalClub.clubName" label="Name" required></v-text-field>
                <v-text-field 
                  v-model="editedFootbalClub.clubFoundingDate" 
                  label="Founding Date" 
                  type="date" 
                  required
                ></v-text-field>
                <v-text-field v-model="editedFootbalClub.clubLocation" label="Location" required></v-text-field>
                <v-btn type="submit" color="green-darken-4">Save Changes</v-btn>
              </v-form>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  


  <script>
  
  import FootbalClubService from '../services/FootbalClubService';
  import FootbalPlayerService from '../services/FootbalPlayerService';

  export default {
  data() {
    return {
      footballClubDetails: null,
      footbalPlayers: [],
      newFootballPlayer: {
        name: '',
        position: '',
        marketValue: 0,
      },
      isEditing: false,
      editedFootbalClub: {
        clubName: '',
        clubFoundingDate: null,
        clubLocation: '',
      },
    };
  },
  computed: {
    filteredFootballPlayers() {
      const footballClubId = this.$route.params.id;
      return this.footbalPlayers.filter(player => player.clubId === footballClubId);
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
  created() {
    const footballClubId = this.$route.params.id;
    this.fetchFootballClubDetails(footballClubId);
    this.fetchFootballPlayers();
  },
  methods: {
    formatMarketValue(value) {
      if(value!=null)
        return new Intl.NumberFormat('en-US', { style: 'decimal' }).format(value) + ' $';
      else new Intl.NumberFormat('en-US', { style: 'decimal' }).format(0) + ' $';
  },
    toggleEditForm() {
      this.isEditing = !this.isEditing;
      this.editedFootbalClub = { ...this.footballClubDetails };
    },
    async fetchFootballClubDetails(id) {
      try {
        const response = await FootbalClubService.getFootbalClub(id);
        this.footballClubDetails = response.data;
      } catch (error) {
        console.error('Error fetching football club:', error);
      }
    },

async editFootballClub() {
  console.log("INSIDE EDIT FC");
  const footballClubId = this.$route.params.id;
  try {
    // Attempt to update the football club's details
    await FootbalClubService.editFootbalClub(footballClubId, this.editedFootbalClub);
    this.footballClubDetails = {...this.editedFootbalClub};
    console.log(footballClubId, "EDITED FC", this.editedFootballClub);
  } catch (error) {
    console.error('Error editing football club:', error);
  }
},


    async fetchFootballPlayers() {
        try {
          const response = await FootbalPlayerService.getFootbalPlayers();
          this.footbalPlayers = response.data;
          
        } catch (error) {
          console.error('Error fetching football players:', error);
        }
      },
  
      async deleteFootballPlayer(id) {
        try {
          await FootbalPlayerService.deleteFootbalPlayer(id);
          this.footbalPlayers = this.footbalPlayers.filter(footbalPlayers => footbalPlayers.id !== id);
        } catch (error) {
          console.error('Error deleting football player:', error);
        }
      },
      async updatePlayersForClub(clubId, updatedClub) {
  try {
    // Step 1: Fetch players associated with the specified clubId
    const response = await FootbalPlayerService.getPlayersByClubId(clubId);
    const playersToUpdate = response.data;

    // Step 2: Update each player with the new club information
    for (const player of playersToUpdate) {
      const updatedPlayerData = {
        ...player,
        clubName: updatedClub.clubName,
        clubFoundingDate: updatedClub.clubFoundingDate,
        clubLocation: updatedClub.clubLocation,
      };

      // Step 3: Call the API to update the player
      await FootbalPlayerService.editFootbalPlayer(player.id, updatedPlayerData);
    }
  } catch (error) {
    console.error('Error updating players:', error);
  }
},
      
      
async addFootballPlayer() {
try {
  const footbalClubId = this.$route.params.id;
  const response = await FootbalPlayerService.addFootbalPlayer({
    name: this.newFootballPlayer.name,
    position: this.newFootballPlayer.position,
    marketValue: this.newFootballPlayer.marketValue,
    clubId: footbalClubId
  });
  const newFootballPlayer = response.data;
  this.footbalPlayers.push(newFootballPlayer);
  this.newFootballPlayer = {
    name: '',
    position: '',
    marketValue: 0,
  };
  
  this.fetchFootballPlayers();

} catch (error) {
  console.error('Error adding football player:', error);
}
},
},
    
  };
  </script>
  
  <!-- <style scoped>
  .footballClub-details-container {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .section-title {
    color: #333;
    font-size: 24px;
    margin-bottom: 16px;
  }
  
  .footballClub-details {
    background-color: #f7f7f7;
    padding: 20px;
    border-radius: 8px;
  }
  
  .footballClub-info {
    margin-bottom: 20px;
  }
  
  .footballPlayers-section {
    border-top: 1px solid #ddd;
    padding-top: 20px;
  }
  
  .football-players-list {
    list-style: none;
    padding: 0;
  }
  
  .football-player{
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .football-players-header {
    font-weight: bold;
  }
  
  .action-buttons {
    display: flex;
    gap: 8px;
  }
  
  .add-footballPlayer-form {
    margin-top: 20px;
  }
  
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
  }
  
  input {
    width: 100%;
    padding: 6px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .add-btn,
  .edit-btn,
  .delete-btn {
    background-color: #3498db;
    color: #fff;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .edit-btn {
    margin-top: 5px;
  }
  
  .delete-btn {
  background-color: #ff6961
  }
  
  .add-btn:hover,
  .edit-btn:hover,
  .delete-btn:hover {
    background-color: #2c3e50;
  }
  
  .form-row {
    display: flex;
    gap: 10px;
  }
  
  .form-group {
    flex: 1;
  }
  
  
  .add-footballPlayer-form  label,
  .add-footballPlayer-form input {
    width: auto; 
  }
  </style> -->