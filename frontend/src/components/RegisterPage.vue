<template>
  <div class="register-container">
    <h2>Register</h2>
    <form @submit.prevent="register" class="register-form">
      <label for="name">Name:</label>
      <input id="name" v-model="name" type="text" required placeholder="Enter your name" />
      <span v-if="name && name==''" class="error">Name shouldn't be empty.</span>
      <br />
      <label for="email">Email:</label>
      <input id="email" v-model="email" type="email" required placeholder="Enter your email" />
      <br />
      <label for="password">Password:</label>
      <input id="password" v-model="password" type="password" required placeholder="Enter your password" />
      <span v-if="password && password.length < 8" class="error">Password must be at least 8 characters long.</span>
      <br />
      <h3>Already have an account? <router-link to="/login">Login</router-link></h3>
      <button type="submit" class="register-btn">Register</button>
    </form>
  </div>
</template>
  
  <script>
  export default {
    data() {
      return {
        name:'',
        email: '',
        password: '',
      };
    },
    methods: {
      async register() {
        try {
          await this.$axios
          .post('/register', {
            name:this.name,
            email: this.email,
            password: this.password,
          })
          
  
          this.$router.push('/login');
        } catch (error) {
          console.error('Registration failed:', error);
        }
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
  
  .error {
    color: red;
    font-size: 14px;
    margin-top: 5px;
  }
  </style>
