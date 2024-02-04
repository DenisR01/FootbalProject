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
