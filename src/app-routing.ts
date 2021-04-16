import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import MyRestaurant from "./components/MyRestaurant.vue";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import CreateAccount from "./components/CreateAccount.vue";
import MyProfile from "./components/MyProfile.vue";
Vue.use(VueRouter);

const myRoutes: Array<RouteConfig> = [
  {
    name: "Home",
    path:"/",
    component: Home,
  },
  {
    name: "Add My Restaurant",
    path: "/myrestaurant",
    component: MyRestaurant,
  },
  {
    name: "My Profile",
    path: "/myprofile",
  },
  {
    name: "Login",
    path: "/",
    component: Login,
  },

  {
    name: "MyProfile",
    path: "/category",
    component: MyProfile,
  }
];

export const AppRouter = new VueRouter({ 
  routes: myRoutes, 
  mode: "history" 
});  
