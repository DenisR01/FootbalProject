import { createApp } from 'vue';
import App from './App.vue';
import router from './routes/routes.js'

import store from './store'; 
import axios from 'axios';

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
app.mount('#app');
