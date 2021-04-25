<template>
  <div id="app">
    <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="/">Restaurant Reservation Application<br><p><small>By: Erin Long, Jon Rabideau, and Ian Wilkewitz</small></p></a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <h6 class="nav-link" v-on:click="gotoHome"
              >Home <span class="sr-only">(current)</span></h6
            >
          </li>
          <li class="nav-item">
            <h6 class="nav-link" v-if="userLoggedIn()" v-on:click="gotoMyRest" id="addRest">Add My Restaurant</h6>
          </li>
          <!-- <li class="nav-item">
            <a class="nav-link" href="FeaturedRestaurants">Find Restaurant</a>
          </li> -->
          <li class="nav-item">
            <h6 class="nav-link" v-if="userLoggedIn()" v-on:click="gotoMyProfile" id="myProf">My Profile</h6>
          </li>
        </ul>
        <!-- <form class="form-inline my-2 my-lg-0">
          <input
            id="search"
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search for a Restaurant"
            aria-label="Search"
          />
          <button
            class="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form> -->
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            
            <a class="nav-link" href="Login" v-if="notLoggedIn()"
              >Sign In <span class="sr-only">(current)</span></a
            >
            <a class="nav-link" v-if="userLoggedIn()" v-on:click="doLogout">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
    <div id="components">
      <!-- <h1>Restaurant Reservation App</h1>
      <h6>By: Erin Long, Jon Rabideau, and Ian Wilkewitz</h6> -->
      <router-view></router-view>
    </div>
   
   
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MyRestaurant from "./components/MyRestaurant.vue";
import Home from "./components/Home.vue";
import FeaturedRestaurants from "./components/FeaturedRestaurants.vue";
import {
  FirebaseFirestore,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from "@firebase/firestore-types";
import MyProfile from "./components/MyProfile.vue";
import Login from "./components/Login.vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { FirebaseAuth, UserCredential } from "@firebase/auth-types";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

@Component({
  components: {
    MyProfile,
    Login,
    MyRestaurant,
    Home,
    FeaturedRestaurants
  },
})
export default class App extends Vue {
  readonly $appDB!: FirebaseFirestore;
  readonly $appAuth!: FirebaseAuth;
  readonly $router!: any;
  private uid= "";
  
  notLoggedIn(): boolean {
    return this.$appAuth.currentUser?.uid == undefined;
  }

  gotoMyRest(): void {
    this.$router.push({ path: "/MyRestaurant" });
  }

  gotoMyProfile(): void {
    this.$router.push({ path: "/MyProfile" });
  }

  gotoHome(): void {
    this.$router.push({ path: "/" });
  }

  userLoggedIn(): boolean {
    return this.$appAuth.currentUser?.uid !== undefined;
  }

  doLogout(): void {
    this.$appAuth.signOut();
    this.$router.push({ path: "/Login" }); // Go backward in the "history stack"
  }

  mounted(): void {
    this.uid = this.$appAuth.currentUser?.uid ?? "none";
        console.log(this.uid)
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
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;

}


.nav-link:hover{
  cursor:pointer;
}
</style>
