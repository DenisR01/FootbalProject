\<template>
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
</template>


<!-- <template>
  <v-container class="footballClubs-container">
    <v-row>
      <v-col cols="12">
        <h2>Football Clubs:</h2>
        <v-card>
          <v-list>
            <v-list-item-group>
              <v-list-item
                v-for="footbalClub in footbalClubs"
                :key="footbalClub.id"
                class="footballClub-item"
                two-line
              >
                <v-list-item-content>
                  <v-list-item-title>{{ footbalClub.clubName }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon @click="editFootbalClub(footbalClub.id)">
                    <v-icon color="blue">mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon color="red" v-if="isAuthenticated" @click="deleteFootbalClub(footbalClub.id)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
                <v-divider></v-divider>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-form v-if="isAuthenticated && !editingFootbalClub" @submit.prevent="addFootbalClub">
          <v-text-field v-model="newFootbalClub.clubName" label="Football Club Name" required></v-text-field>
          <v-text-field v-model="newFootbalClub.clubFoundingDate" label="Founding Date" type="date" required></v-text-field>
          <v-text-field v-model="newFootbalClub.clubLocation" label="Location" required></v-text-field>
          <v-btn color="success" dark type="submit">Add New Football Club</v-btn>
        </v-form>
        
        <v-form v-if="isAuthenticated && editingFootbalClub" @submit.prevent="updateFootbalClub(editedFootbalClub.id)">
          <v-text-field v-model="editedFootbalClub.clubName" label="Football Club Name" required></v-text-field>
          <v-text-field v-model="editedFootbalClub.clubFoundingDate" label="Founding Date" type="date" required></v-text-field>
          <v-text-field v-model="editedFootbalClub.clubLocation" label="Location" required></v-text-field>
          <v-btn color="info" dark type="submit">Update Football Club</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template> -->


<!-- <template>
  <v-container class="footballClubs-container">
    <v-row>
      <v-col cols="12">
        <h2>Football Clubs:</h2>
        <v-card>
          <v-list>
            <v-list-item-group>
              <v-list-item
                v-for="footballClub in footballClubs"
                :key="footballClub.id"
                class="footballClub-item"
                two-line
              >
                <v-list-item-content>
                  <v-list-item-title>{{ footballClub.clubName }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon @click="editFootballClub(footballClub.id)">
                    <v-icon color="blue">mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon color="red" v-if="isAuthenticated" @click="deleteFootballClub(footballClub.id)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
                <v-divider></v-divider>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-form v-if="isAuthenticated && !editingFootballClub" @submit.prevent="addFootballClub">
          <v-text-field v-model="newFootballClub.clubName" label="Football Club Name" required></v-text-field>
          <v-text-field v-model="newFootballClub.clubFoundingDate" label="Founding Date" type="date" required></v-text-field>
          <v-text-field v-model="newFootballClub.clubLocation" label="Location" required></v-text-field>
          <v-btn color="success" dark type="submit">Add New Football Club</v-btn>
        </v-form>
        
        <v-form v-if="isAuthenticated && editingFootballClub" @submit.prevent="updateFootballClub(editedFootballClub.id)">
          <v-text-field v-model="editedFootballClub.clubName" label="Football Club Name" required></v-text-field>
          <v-text-field v-model="editedFootballClub.clubFoundingDate" label="Founding Date" type="date" required></v-text-field>
          <v-text-field v-model="editedFootballClub.clubLocation" label="Location" required></v-text-field>
          <v-btn color="info" dark type="submit">Update Football Club</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template> -->


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

     async editFootbalClub(id) {
      try {
        const response = await FootbalClubService.getFootbalClub(id);
        this.editingFootbalClub = true;
        this.editedFootbalClub = response.data;
      } catch (error) {
        console.error('Error fetching football club  for editing:', error);
      }
    },

    async updateFootbalClub(id) {
      try {
        const response = await FootbalClubService.editFootbalClub(id, this.editedFootbalClub);
        const editedFootbalClub = response;
        this.footbalClubs.push(editedFootbalClub);
        this.loadFootbalClubs();
        this.cancelEdit();
      } catch (error) {
        console.error('Error updating footbal club:', error);
      }
},

    cancelEdit() {
      this.editingFootbalClub = false;
      this.editedFootbalClub = {
        clubName: '',
        clubFoundingDate: null,
        clubLocation: '',
      };
    },

    resetNewFootbalClub() {
      this.newFootbalClub = {
        clubName: '',
        clubFoundingDate: null,
        clubLocation: '',
      };
    },
  },
};
</script>

<style scoped>
.footballClubs-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  color: #333;
  font-size: 28px;
  margin-bottom: 20px;
}

ul {
  list-style: none;
  padding: 0;
}

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

.footballClub-info {
  flex: 1;
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

.buttons-container {
  display: flex;
  gap: 10px;
}

.edit-btn,
.delete-btn {
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn {
  background-color: #ff6961;
}

.edit-btn:hover,
.delete-btn:hover {
  background-color: #2c3e50;
}

.add-form {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap; 
}

.form-group {
  margin-right: 10px; 
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

input {
  width: 200px; 
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.add-btn {
  background-color: #2ecc71;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.add-btn:hover {
  background-color: #27ae60;
}

.name-input,
.location-input,
.date-input {
  margin-bottom: 15px;
}
</style>