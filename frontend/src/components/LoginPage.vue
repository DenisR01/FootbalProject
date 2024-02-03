<!-- A<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login" class="login-form">
      <label>Email:</label>
      <input v-model="email" type="email" required />
      <br />
      <label>Password:</label>
      <input v-model="password" type="password" required />
      <br />
      <span v-if="userNotFound" class="error">Invalid email address or password.</span>
      <h3>Don't have an account? <router-link to="/register">Register</router-link></h3>
      <button type="submit" class="login-btn">Login</button>
    </form>
  </div>
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
        const response = await this.$axios
        .post('http://localhost:3000/login', {
          email: this.email,
          password: this.password,
        })

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
.login-container {
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
}

.login-form {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin-top: 20px;
}

@media only screen and (max-width: 600px) {
  .login-form {
    padding: 10px;
  }
}

@media only screen and (min-width: 601px) and (max-width: 1024px) {
  .login-form {
   padding: 12px;
  }
}



label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  box-sizing: border-box;
}

.login-btn {
  background-color: #4caf50;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}
</style> -->

<template>
  <v-container>
    <v-row justify="center">
      <!-- Adjust column size based on the screen size -->
      <v-col cols="12" sm="10" md="8" lg="6" xl="4">
        <v-card class="pa-5" elevation="2">
          <v-card-title class="text-h5 text-center">Login</v-card-title>
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
