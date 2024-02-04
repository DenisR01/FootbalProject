<template>
  <v-container>
    <v-row justify="center">
      <!-- Adjust column size based on the screen size -->
      <v-col cols="12" sm="10" md="8" lg="6" xl="4">
        <v-card class="pa-5" elevation="2">
          <v-card-title class="login">Login</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                required
              ></v-text-field>
              <v-alert
                v-if="userNotFound"
                type="error"
                class="mt-4"
              >Invalid email address or password.</v-alert>
              <v-row justify="center" >
                <v-col cols="auto" >
                  <v-btn type="submit" color="green-darken-4" large>Login</v-btn>
                </v-col>
                <v-col cols="auto">
                  <v-btn text color="green-darken-4" to="/register"  large>Register</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      userNotFound: false,
    };
  },
  methods: {
    async login() {
      try {
        const response = await this.$axios.post('http://localhost:3000/login', {
          email: this.email,
          password: this.password,
        });

        if (response.status === 404 || response.data.error === 'Invalid email address or password') {
          this.userNotFound = true;
          return;
        }

        this.userNotFound = false;
        const token = response.data.token;
        this.$store.dispatch('login', token);
        localStorage.setItem('token', token);
        this.$router.push('/');
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Add responsive styling if necessary */
</style>
