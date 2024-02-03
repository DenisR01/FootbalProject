<!-- <template>
  <div>
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from './components/headerComponent.vue';
export default {
  name:'App',
  components: {
    Header,
  }
};
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
}

nav {
  padding: 20px;
  
}

nav a {
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
  font-size: 22px;
}
</style>

 -->
 <template>
  <v-app>
    <Header />
  </v-app>
</template>

<script>
import Header from './components/headerComponent.vue';
export default {
  name: 'App',
  components: {
    Header,
  },
};
</script>

<style>
/* Remove any custom styles that conflict with Vuetify */

/* You can define your custom styles here */

/* Example: Modify the font size and color of the router-link */
.router-link-exact-active {
  color: #42b983;
  font-size: 22px;
}
</style>
