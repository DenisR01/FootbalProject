  <template>
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
  </style>
  
