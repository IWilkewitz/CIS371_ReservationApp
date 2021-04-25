import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Login from "./components/Login.vue";
import MyProfile from "./components/MyProfile.vue";
import FeaturedRestaurants from "./components/FeaturedRestaurants.vue";
import Home from "./components/Home.vue";
import MyRestaurant from "./components/MyRestaurant.vue";
import EditAccountDetails from "./components/EditAccountDetails.vue";
import NotFound from "./components/NotFound.vue"
Vue.use(VueRouter);

const myRoutes: Array<RouteConfig> = [
  {
    name: "Login",
    path: "/Login",
    component: Login,
  },

  {
    name: "MyProfile",
    path: "/MyProfile",
    component: MyProfile,
  },

  {
    name: "EditAccountDetails",
    path: "/EditAccountDetails",
    component: EditAccountDetails,
  },

  {
    name: "MyRestaurant>",
    path: "/MyRestaurant",
    component: MyRestaurant,
  },

  {
    name: "Home",
    path: "/",
    component: Home,
  },

  {
    name: "FeaturedRestaurants",
    path: "/FeaturedRestaurants",
    component: FeaturedRestaurants,
  },

  { path: '/:pathMatch(.*)*', component: NotFound },
  
];

export const AppRouter = new VueRouter({ 
  routes: myRoutes, 
  mode: "history" 
});   