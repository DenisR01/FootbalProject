\<template>
  <div class="footbalClubs-container">
    <h2>Football Clubs:</h2>
    <ul>
      <li v-for="footbalClub in footbalClubs" :key="footbalClub.id" class="footbalClub-item">
        <div class="footbalClub-info">
          <router-link v-if="footbalClub.id" :to="{ name: 'footbalClub-details', params: { id: footbalClub.id }}" class="footbalClub-link">
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
        <label for="footbalClubName">Football Club Name:</label>
        <input v-model="newFootbalClub.clubName" type="text" id="footbalClubName" required class="name-input">
      </div>

      <div class="form-group">
        <label for="footbalClubFoundingDate">Founding Date:</label>
        <input v-model="newFootbalClub.clubFoundingDate" type="date" id="footbalClubFoundingDate" required class="date-input">
      </div>

      <div class="form-group">
        <label for="footbalClubLocation">Location:</label>
        <input v-model="newFootbalClub.clubLocation" id="footbalClubLocation" required class="location-input">
      </div>

      <button type="submit" class="add-btn">Add New Football Club</button>
    </form>
    
    <form v-if="isAuthenticated && editingFootbalClub" @submit.prevent="updateFootbalClub(editedFootbalClub.id)" class="add-form">
      <div class="form-group">
        <label for="footbalClubName">Football Club Name:</label>
        <input v-model="editedFootbalClub.clubName" type="text" id="footbalClubName" required class="name-input">
      </div>

      <div class="form-group">
        <label for="footbalClubFoundingDate">Founding Date:</label>
        <input v-model="editedFootbalClub.clubFoundingDate" type="date" id="footbalClubFoundingDate" required class="date-input">
      </div>

      <div class="form-group">
        <label for="footbalClubLocation">Location:</label>
        <input v-model="editedFootbalClub.clubLocation" type="text" id="footbalClubLocation" required class="location-input">
      </div>

      <button type="submit" class="add-btn" >Update Football Club</button>
    </form>

  </div>
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
.footbalClubs-container {
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

.footbalClub-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footbalClub-info {
  flex: 1;
}

.footbalClub-link {
  text-decoration: none;
  color: #0d0e0e;
  font-weight: bold;
  font-size: 16px;
}

.footbalClub-link :hover {
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