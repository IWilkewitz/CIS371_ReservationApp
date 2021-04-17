import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Login from "./components/Login.vue";
import MyProfile from "./components/MyProfile.vue";
import EditAccountDetails from "./components/EditAccountDetails.vue";
Vue.use(VueRouter);

const myRoutes: Array<RouteConfig> = [
  {
    name: "Login",
    path: "/",
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
  }
];

export const AppRouter = new VueRouter({ 
  routes: myRoutes, 
  mode: "history" 
});   