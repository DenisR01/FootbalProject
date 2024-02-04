  <template>
    <v-container class="register">
      <v-row justify="center" >
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-card class="pa-5" elevation="2">
            <v-card-title class="register">Register</v-card-title>
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
  