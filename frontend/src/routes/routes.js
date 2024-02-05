import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/LoginPage.vue';
import Register from '../components/RegisterPage.vue';
import FootbalClubs from '../components/FootbalClubs.vue'
import FootbalClubsDetails from '../components/FootbalClubsDetails.vue'
import FootballPlayers from '../components/FootballPlayers.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: FootbalClubs
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  { 
    path: '/footballClub/:id', 
    component: FootbalClubsDetails, 
    name: 'footballClub-details' 
  },
  
  { 
    path: '/footballPlayers', 
    component: FootballPlayers, 
    name: 'football-players' 
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router