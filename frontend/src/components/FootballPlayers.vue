<template>
    <div class="footbal-players-page">
      <h2 class="page-title">Football Players</h2>
      
      <label for="sortDirection" class="sort-label">Sort by Footbaler Name:</label>
      <select id="sortDirection" v-model="sortDirection" @change="sortMembers" class="sort-select">
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
  
      <div class="footbal-players-container">
        <div v-for="player in footballPlayers" :key="player.id" class="football-player-card">
          <div class="football-player-info">
            <h3>{{ player.name }}</h3>
            <p>Position: {{ player.position }}</p>
            <p class="marketValue">Market Value: {{ player.marketValue }}</p>
            <router-link v-if="player.clubName" :to="{ name: 'footbalClub-details', params: { id: player.clubName }}" class="footbalClub-link">
             Club: {{ player.clubName}}
            </router-link>
          </div>
          
          <div class="football-player-actions" v-if="isAuthenticated">
            <button @click="deleteTeamMember(member.id)" class="delete-btn">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  
  import FootbalPlayerService from '../services/FootbalPlayerService';
  
  export default {
    data() {
      return {
        footballPlayers: [],
        sortDirection:'asc',
      };
    },
    computed: {
      isAuthenticated() {
        return this.$store.getters.isAuthenticated;
      },
       sortedPlayers() {
        return this.footballPlayers.slice().sort((a, b) => {
          const result = a.name.localeCompare(b.name);
          return this.sortDirection === 'asc' ? result : -result;
        });
      },
    },
    created() {
      this.fetchFootbalPlayers();
    },
    methods: {
      async fetchFootbalPlayers() {
        try {
          const response = await FootbalPlayerService.getFootbalPlayers();
          this.footballPlayers = response.data;
        } catch (error) {
          console.error('Error fetching football players:', error);
        }
      },
      async deleteFootbalPlayer(id) {
        try {
          await FootbalPlayerService.deleteFootbalPlayer(id);
          this.footballPlayers = this.footballPlayers.filter((member) => member.id !== id);
        } catch (error) {
          console.error('Error deleting footbal player:', error);
        }
      },
       sortPlayers() {
         this.sortedPlayers;
       }
    },
  };
  </script>
  
  <style scoped>
  .footbal-players-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .page-title {
    color: #333;
    font-size: 28px;
    margin-bottom: 20px;
  }
  
  .sort-label {
    margin-right: 10px;
  }
  
  .sort-select {
    padding: 8px;
  }
  
  .footbal-players-container {
    display: flex;
    flex-wrap: wrap;
  }
  
  .football-player-card {
    background-color: #f7f7f7;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin: 10px;
    padding: 15px;
    width: calc(33.33% - 20px); 
    box-sizing: border-box;
    position: relative;
  }
  
  .football-player-info {
    margin-bottom: 40px;
  }
  
  .football-player-info h3 {
    font-size: 18px;
    margin-bottom: 5px;
  }
  
  .marketValue {
    color: #555;
  }
  
  .project-name {
    font-weight: bold;
  }
  
  .football-player-actions {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
  
  a.footbalClub-link {
    text-decoration: none;
    font-weight: bold;
    color: black;
  }
  
  .edit-btn,
  .delete-btn {
    background-color: #3498db;
    color: #fff;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 5px;
  }
  
  .delete-btn {
    background-color: #ff6961;;
  }
  
  .edit-btn:hover,
  .delete-btn:hover {
    background-color: #2c3e50;
  }
  
  a.footbalClub-link:hover {
    text-decoration: none;
    font-weight: bold;
    color: black;
    font-size: 17px;
  }
  </style>
  