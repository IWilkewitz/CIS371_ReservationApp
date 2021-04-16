import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import MyRestaurant from "./components/MyRestaurant.vue";
import Home from "./components/Home.vue";
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
    component: MyProfile,
  }
];

export const AppRouter = new VueRouter({ 
  routes: myRoutes, 
  mode: "history" 
});  