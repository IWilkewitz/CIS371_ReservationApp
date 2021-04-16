<template>
  <div id="app">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Restaurant Reservation Application</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Restaurants</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">My Profile</a>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search for a Restaurant" aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
             <a class="nav-link" href="#">Sign In <span class="sr-only">(current)</span></a>
          </li>
        </ul>
            
      </div>
    </nav>
    <div id="components">
      <h1>Restaurant Reservation App</h1>
      <h6>By: Erin Long, Jon Rabideau, and Ian Wilkewitz</h6>
      <router-view></router-view>
    </div>
    <div id="logout">
      <button v-if="userLoggedIn()">Logout</button>
    </div>
  </div>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
import MyRestaurant from "./components/MyRestaurant.vue";
import { FirebaseFirestore } from "@firebase/firestore-types";
import { FirebaseAuth } from "@firebase/auth-types";

@Component({
  components: {
    MyRestaurant
import MyProfile from './components/MyProfile.vue';
import Login from './components/Login.vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { FirebaseAuth, UserCredential } from "@firebase/auth-types";

@Component({
  components: {
    HelloWorld, MyProfile, Login
  },
})

export default class App extends Vue {
  readonly $appDB!: FirebaseFirestore;
  readonly $appAuth!: FirebaseAuth;
  readonly $router!: any;
  mounted(): void {
    console.log("Test")
  }

  GoToAddRestaurant(): void{
    this.$router.push({path: "/myrestaurant"})
  }

  GoToHome(): void{
    this.$router.push({path: "/"})
  }

  GoToMyProfile(): void{
    this.$router.push({path: "/myprofile"})
  }

  readonly $appAuth!: FirebaseAuth;

  userLoggedIn(): boolean {
  return this.$appAuth.currentUser?.uid !== undefined;
}

doLogout(): void {
  this.$appAuth.signOut();
  this.$router.back();    // Go backward in the "history stack"
}
  
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
