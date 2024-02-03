import { createApp } from 'vue';
import App from './App.vue';
import router from './routes/routes.js'

import store from './store'; 
import axios from 'axios';

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000', 
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});


axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;


const app = createApp(App);
app.config.globalProperties.$axios = axios;
app.use(router);
app.use(store);

const vuetify = createVuetify({
  components,
  directives,
})

app.use(vuetify)
app.mount('#app');
