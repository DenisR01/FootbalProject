  <!-- <template>
    <div class="register-container">
      <h2>Register</h2>
      <form @submit.prevent="register" class="register-form">
        <label for="name">Name:</label>
        <input id="name" v-model="name" type="text" required placeholder="Enter your name" />
        <br />
  
        <label for="email">Email:</label>
        <input id="email" v-model="email" type="email" required placeholder="Enter your email" />
        <br />
  
        <label for="password">Password:</label>
        <input id="password" v-model="password" type="password" required placeholder="Enter your password" />
        <br />
  
        <button type="submit" class="register-btn">Register</button>
      </form>
  
      <div v-if="error" class="error-popup">{{ error }}</div>
      <h3>Already have an account? <router-link to="/login">Login</router-link></h3>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
        error: '', // For displaying errors
      };
    },
    methods: {
      async register() {
        if (!this.validatePassword(this.password)) {
          this.error = 'Password must be at least 8 characters long and contain at least one uppercase letter.';
          return;
        }
  
        try {
          await this.$axios.post('http://localhost:3000/register', {
            name: this.name,
            email: this.email,
            password: this.password,
          });
  
          this.$router.push('/login');
        } catch (error) {
          console.error('Registration failed:', error);
          this.error = 'Registration failed. Please try again.';
        }
      },
      validatePassword(password) {
        return password.length >= 8 && /[A-Z]/.test(password);
      },
    },
  };
  </script>
  
  <style scoped>
  .register-container {
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
  }
  
  .register-form {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    margin-top: 20px;
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
  
  .register-btn {
    background-color: #4caf50;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .error-popup {
    background-color: #ffccd5;
    color: #d8000c;
    padding: 10px;
    margin-top: 20px;
    border-radius: 4px;
    text-align: left;
  }
  </style> -->
  
  <template>
    <v-container class="register">
      <v-row justify="center" >
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-card class="pa-5" elevation="2">
            <v-card-title class="v-card-title">Register</v-card-title>
            <v-form @submit.prevent="register"  >
              <v-text-field 
                v-model="name"
                label="Name"
                required
                :rules="[rules.required]"
                clearable
              ></v-text-field>
              <v-text-field
                v-model="email"
                label="Email"
                required
                :rules="[rules.required, rules.email]"
                clearable
                type="email"
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                required
                :rules="[rules.required, rules.password]"
                clearable
                type="password"
              ></v-text-field>
              <v-btn type="submit" color="green-darken-4" large block>Register</v-btn>
            </v-form>
            <v-alert v-if="error" type="error" class="errors">{{ error }}</v-alert>
            <v-btn to="/login" text color="green-darken-4"> Already have an account? Login</v-btn>
          
            
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
        error: '', // For displaying errors
        rules: {
          required: value => !!value || 'Required.',
          email: value => /.+@.+\..+/.test(value) || 'E-mail must be valid.',
          password: value =>
            (value && value.length >= 8 && /[A-Z]/.test(value)) ||
            'Password must be at least 8 characters long and contain at least one uppercase letter.',
        },
      };
    },
    methods: {
      async register() {
        if (!this.rules.password(this.password)) {
          this.error = 'Password must be at least 8 characters long and contain at least one uppercase letter.';
          return;
        }
  
        try {
          await this.$axios.post('http://localhost:3000/register', {
            name: this.name,
            email: this.email,
            password: this.password,
          });
  
          this.$router.push('/login');
        } catch (error) {
          console.error('Registration failed:', error);
          this.error = 'Registration failed. Please try again.';
        }
      },
    },
  };
  </script>
  