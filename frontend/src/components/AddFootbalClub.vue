<template>
  <div>
    <h2>Add a new football club</h2>
    <form @submit.prevent="addFootbalClub">
      <label for="name">Football Club name:</label>
      <input type="text" id="name" v-model="newFootbalClub.clubName" required>

       <label for="date">Date:</label>
      <input type="date" id="date" v-model="newFootbalClub.clubFoundingDate" required>

      <label for="location">Location:</label>
      <textarea id="locaiton" v-model="newFootbalClub.clubLocation" required></textarea>


      <button type="submit">Add</button>
    </form>
  </div>
</template>

<script>
import FootbalClubService from '../services/FootbalClubService';

export default {
  data() {
    return {
      newFootbalClub: {
          clubName: '',
          clubFoundingDate: null,
          clubLocation: '',
        }
    };
  },
  methods: {
    addFootbalClub() {
      FootbalClubService.addFootbalClub(this.newFootbalClub)
        .then(response => {
          console.log(response.data.message);
          this.newFootbalClub = {
            clubName: '',
            clubFoundingDate: null,
            clubLocation: '',
          };
        })
        .catch(error => {
          console.error('Error adding football club', error);
        });
    },
  },
};
</script>

<style scoped>

</style>