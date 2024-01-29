   <template>
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
                <input placeholder="Position" v-model="newFootballPlayer.position" type="text" id="newFootballPlayerPosition" required>
              </div>
              <div class="form-group">
                <input placeholder="marketValue" v-model="newFootballPlayer.marketValue" type="number" id="newFootballPlayerMarketValue" required>
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
    // async editFootballClub() {
    //   const footballClubId = this.$route.params.id;
    //   try {
    //     await FootbalClubService.editFootbalClub(footballClubId, this.editedFootbalClub);
    //     this.isEditing = false; 
    //     this.fetchFootballClubDetails(footballClubId);
    //   } catch (error) {
    //     console.error('Error editing football club:', error);
    //   }
    // },
      async editFootballClub() {
    const footballClubId = this.$route.params.id;
    try {
      await FootbalClubService.editFootbalClub(footballClubId, this.editedFootbalClub);
      this.isEditing = false;
      this.footballClubDetails = { ...this.editedFootbalClub };

      // Fetch updated football club details
      await this.fetchFootballClubDetails(footballClubId);

      // Fetch updated list of football players associated with this club
      await this.fetchFootballPlayers();
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
  
  <style scoped>
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
  </style>