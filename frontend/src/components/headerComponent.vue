<template>
  <v-app>
    <v-app-bar app color='green-darken-4'>
      <v-toolbar-title>Football Info</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text :to="'/'">Football Clubs</v-btn>
      <v-btn text :to="'/footballPlayers'">Football Players</v-btn>
      <v-btn v-if="!isAuthenticated" text :to="'/login'">Login</v-btn>
      <v-btn v-if="isAuthenticated" @click="logout">Logout</v-btn>
    </v-app-bar>
    <v-main>
      <!-- Main content injected by router-view -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/');
    },
  },
};
</script>
