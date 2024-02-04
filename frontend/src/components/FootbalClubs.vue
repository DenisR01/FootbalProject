<!-- \<template>
  <div class="footballClubs-container">
    <h2>Football Clubs:</h2>
    <ul>
      <li v-for="footbalClub in footbalClubs" :key="footbalClub.id" class="footballClub-item">
        <div class="footballClub-info">
          <router-link v-if="footbalClub.id" :to="{ name: 'footballClub-details', params: { id: footbalClub.id }}" class="footballClub-link">
            {{footbalClub.clubName }}
          </router-link>
        </div>
        <div class="buttons-container">
          <button v-if="isAuthenticated" @click="deleteFootbalClub(footbalClub.id)" class="delete-btn">Delete</button>
        </div>
      </li>
    </ul>
    <form v-if="isAuthenticated && !editingFootbalClub" @submit.prevent="addFootbalClub" class="add-form">
      <div class="form-group">
        <label for="footballClubName">Football Club Name:</label>
        <input v-model="newFootbalClub.clubName" type="text" id="footballClubName" required class="name-input">
      </div>

      <div class="form-group">
        <label for="footballClubFoundingDate">Founding Date:</label>
        <input v-model="newFootbalClub.clubFoundingDate" type="date" id="footballClubFoundingDate" required class="date-input">
      </div>

      <div class="form-group">
        <label for="footballClubLocation">Location:</label>
        <input v-model="newFootbalClub.clubLocation" id="footballClubLocation" required class="location-input">
      </div>

      <button type="submit" class="add-btn">Add New Football Club</button>
    </form>
    
    <form v-if="isAuthenticated && editingFootbalClub" @submit.prevent="updateFootbalClub(editedFootbalClub.id)" class="add-form">
      <div class="form-group">
        <label for="footballClubName">Football Club Name:</label>
        <input v-model="editedFootbalClub.clubName" type="text" id="footballClubName" required class="name-input">
      </div>

      <div class="form-group">
        <label for="footballClubFoundingDate">Founding Date:</label>
        <input v-model="editedFootbalClub.clubFoundingDate" type="date" id="footballClubFoundingDate" required class="date-input">
      </div>

      <div class="form-group">
        <label for="footballClubLocation">Location:</label>
        <input v-model="editedFootbalClub.clubLocation" type="text" id="footballClubLocation" required class="location-input">
      </div>

      <button type="submit" class="add-btn" >Update Football Club</button>
    </form>

  </div>
</template> -->
<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" xl="6">
        <h2>Football Clubs:</h2>
        <v-list dense>
          <v-list-item 
            v-for="footbalClub in footbalClubs" 
            :key="footbalClub.id"
            class="footballClub-item"
          >
            <v-list-item-title>
              <router-link 
                v-if="footbalClub.id" 
                :to="{ name: 'footballClub-details', params: { id: footbalClub.id }}"
                class="footballClub-link"
              >
                {{ footbalClub.clubName }}
              </router-link>
            </v-list-item-title>
            <v-list-item-action v-if="isAuthenticated">
              <v-btn color="red" text @click="deleteFootbalClub(footbalClub.id)">
                Delete
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-divider class="addFootballClub"></v-divider>
        <v-form v-if="isAuthenticated && !editingFootbalClub" @submit.prevent="addFootbalClub">
          <v-text-field
            v-model="newFootbalClub.clubName"
            label="Football Club Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="newFootbalClub.clubFoundingDate"
            label="Founding Date"
            type="date"
            required
          ></v-text-field>
          <v-text-field
            v-model="newFootbalClub.clubLocation"
            label="Location"
            required
          ></v-text-field>
          <v-btn type="submit" color="green darken-4">Add New Football Club</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>




<script>
import FootbalClubService from '../services/FootbalClubService';

export default {
  data() {
    return {
      footbalClubs: [],
      newFootbalClub: {
        clubName: '',
        clubFoundingDate: null,
        clubLocation: '',
      },
      editingFootbalClub: false,
      editedFootbalClub: {
        clubName: '',
        clubFoundingDate: null,
        clubLocation: '',
      },
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
  mounted() {
    this.loadFootbalClubs();
  },
  methods: {

    resetNewFootbalClub() {
      this.newFootbalClub = {
        clubName: '',
        clubFoundingDate: null,
        clubLocation: '',
      };
    },
    async loadFootbalClubs() {
      try {
        const response = await FootbalClubService.getFootbalClubs();
        this.footbalClubs = response.data;
      } catch (error) {
        console.error('Error fetching footbal clubs:', error);
      }
    },
    
    async deleteFootbalClub(id) {
      try {
        await FootbalClubService.deleteFootbalClub(id);
        this.footbalClubs = this.footbalClubs.filter(footbalClub => footbalClub.id !== id);
      } catch (error) {
        console.error('Error deleting footbal club:', error);
      }
    },

    async addFootbalClub() {
      try {
        const response = await FootbalClubService.addFootbalClub(this.newFootbalClub);
        this.footbalClubs.push(response.data);
        this.resetNewFootbalClub();
        this.loadFootbalClubs();
      } catch (error) {
        console.error('Error adding footbal club:', error);
      }
    },
  },
};
</script>

<style scoped>
.footballClub-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color:#1B5E20;
  
}
.footballClub-link {
  text-decoration: none;
  color: white;
  font-weight: bold;
  font-size: 16px;
  font-weight: bold;
}

.footballClub-link :hover {
  font-size: 20px;
}
</style>