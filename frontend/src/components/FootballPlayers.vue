
<template>
  <v-container class="football-players-page">
    <v-row>
      <v-col>
        <h2 class="page-title">Football Players</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-start align-center">
        <v-select
          v-model="sortDirection"
          @change="sortPlayers"
          :items="['asc', 'desc']"
          label="Sort by Club name"
          outlined
          dense
          class="sort-select"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="player in sortedPlayers"
        :key="player.id"
        cols="12" sm="6" md="4"
      >
        <v-card class="football-player-card" elevation="2">
          <v-card-title class="footbalPlayerName">{{ player.name }}</v-card-title>
          <v-card-text>
            <div><strong>Position:</strong> {{ player.position }}</div>
            <div><strong>Market Value:</strong> {{ formatMarketValue(player.marketValue) }}</div>
            <div><strong>Club:</strong> {{ player.clubName }}</div>
          </v-card-text>
          <v-card-actions v-if="isAuthenticated">
            <v-btn color="red" @click="deleteFootbalPlayer(player.id)" block class="delete-btn">
              <span style="color: black; font-weight: bold;">Delete</span>
            </v-btn>

          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import FootbalPlayerService from "../services/FootbalPlayerService";
import FootbalClubService from "../services/FootbalClubService";

export default {
  data() {
    return {
      footballPlayers: [],
      sortDirection: "asc",
      footballClubDetails: {}
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },

    sortedPlayers() {
      return this.footballPlayers.slice().sort((a, b) => {
        const result = a.clubName.localeCompare(b.clubName);
        return this.sortDirection === "asc" ? result : -result;
      });
    },
  },
  created() {
    this.fetchFootbalPlayers();
  },
  methods: {
    formatMarketValue(value) {
    return new Intl.NumberFormat('en-US', { style: 'decimal' }).format(value) + ' $';
  },
    async fetchFootbalPlayers() {
      try {
        const response = await FootbalPlayerService.getFootbalPlayers();
        this.footballPlayers = response.data;
      } catch (error) {
        console.error("Error fetching football players:", error);
      }
    },
    async deleteFootbalPlayer(id) {
      try {
        await FootbalPlayerService.deleteFootbalPlayer(id);
        this.footballPlayers = this.footballPlayers.filter(
          (player) => player.id !== id
        );
      } catch (error) {
        console.error("Error deleting footbal player:", error);
      }
    },
    sortPlayers() {
      this.sortedPlayers;
    },
    async fetchFootballClubDetails(clubName) {
      try {
        const response = await FootbalClubService.getFootbalClubByName(clubName);
        this.footballClubDetails = response.data;
      } catch (error) {
        console.error("Error fetching football club details:", error);
      }
    }

  },
};
</script>
<style scoped>
.football-player-card {
  background-image: url('https://img.freepik.com/free-vector/gradient-football-field-background-with-gate_23-2149002270.jpg');
  background-size: cover; /* Cover ensures the background covers the card area */
  background-position: center; /* Center the background image */
  color: white; /* Optional: Change text color for better readability */
}

/* Additional styling for text to ensure it's readable over the background */
.football-player-card .v-card-title,
.football-player-card .v-card-text {
  background-color: rgba(0, 0, 0, 0.5); /* Optional: Adds a slight overlay for text readability */
  border-radius: 4px; /* Optional: Rounds the corners of the overlay */
  padding: 4px; /* Optional: Adds some padding inside the overlay */
}
.delete-btn {
  background-color: rgb(227, 18, 18) !important; 
}
</style>

