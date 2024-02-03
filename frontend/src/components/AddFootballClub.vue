<!-- <template>
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

</style> -->

<template>
  <v-container>
    <h2>Add a New Football Club</h2>
    <v-form @submit.prevent="addFootbalClub" ref="form">
      <v-text-field
        v-model="newFootbalClub.clubName"
        :rules="[rules.required]"
        label="Football Club Name"
        required
      ></v-text-field>

      <v-date-picker
        v-model="newFootbalClub.clubFoundingDate"
        :rules="[rules.required]"
        label="Date"
        required
      ></v-date-picker>

      <v-textarea
        v-model="newFootbalClub.clubLocation"
        :rules="[rules.required]"
        label="Location"
        required
      ></v-textarea>

      <v-btn type="submit" color="green-darken-4">Add</v-btn>
    </v-form>
  </v-container>
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
      },
      rules: {
        required: value => !!value || 'Required.',
      }
    };
  },
  methods: {
    addFootbalClub() {
      if (this.$refs.form.validate()) {
        FootbalClubService.addFootbalClub(this.newFootbalClub)
          .then(response => {
            console.log(response.data.message);
            this.resetForm();
          })
          .catch(error => {
            console.error('Error adding football club', error);
          });
      }
    },
    resetForm() {
      this.newFootbalClub = {
        clubName: '',
        clubFoundingDate: null,
        clubLocation: '',
      };
      this.$refs.form.reset();
    }
  },
};
</script>

<style scoped>
/* Add any scoped styles if needed */
</style>
