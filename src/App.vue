<template>
  <div id="app">
    <h1>Rezzy</h1>
    <button @click="GoToHome">Home</button>
    <button @click="GoToMyProfile">My Profile</button>
    <button @click="GoToAddRestaurant">Add My Restaurant</button>
    <router-view></router-view>
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
