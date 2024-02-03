<!-- <template>
  <header>
    <nav>
      <ul>
        <li><router-link to="/">Football Clubs</router-link></li>
        <li><router-link to="/footballPlayers">Football Players</router-link></li>
        <li v-if="!isAuthenticated"><router-link to="/login">Login</router-link></li>
        <li v-if="isAuthenticated"><button @click="logout" class="logout-btn">Logout</button></li>
      </ul>
    </nav>
  </header>
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

<style scoped>
header {
  background-color: #c0e9e7;
  color: #fff;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-around;
  width: 100%;
}

nav ul li {
  margin: 0 10px;
}

router-link, .logout-btn {
  color: #fff;
  text-decoration: none;
  padding: 5px;
  border: none;
  background: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
}

router-link:hover, .logout-btn:hover,
router-link:focus, .logout-btn:focus {
  text-decoration: underline;
  color: #4caf50; /* Adjust color as needed */
}

@media (max-width: 768px) {
  nav ul {
    flex-direction: column;
    align-items: center;
  }

  nav ul li {
    margin-bottom: 10px;
  }
}
</style> -->

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

<!-- <style scoped>
.v-btn {
  color: #FFF;
  font-weight: bold;
}

.v-btn:hover {
  text-decoration: underline;
  color: #4caf50;
}

@media (max-width: 768px) {
  .v-app-bar {
    flex-direction: column;
  }

  .v-btn {
    margin-bottom: 10px;
  }
}
</style>


 -->
