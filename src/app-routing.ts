import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Login from "./components/Login.vue";
import MyProfile from "./components/MyProfile.vue";
Vue.use(VueRouter);

const myRoutes: Array<RouteConfig> = [
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