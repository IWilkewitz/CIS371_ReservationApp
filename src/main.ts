import Vue from "vue";
import App from "./App.vue";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { AppRouter } from "./app-routing";

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyCamMjuzcTZS_rDhs3XC88qTWGXlCbeWL0",
  authDomain: "restaurant-res-26e48.firebaseapp.com",
  projectId: "restaurant-res-26e48",
  storageBucket: "restaurant-res-26e48.appspot.com",
  messagingSenderId: "320838581873",
  appId: "1:320838581873:web:85c9586e0a749c13a9a5d0",
  measurementId: "G-23Q5BE0VF8",
};
firebase.initializeApp(firebaseConfig);
Vue.prototype.$appDB = firebase.firestore();
Vue.prototype.$appAuth = firebase.auth();

new Vue({
  router: AppRouter, 
  render: (h) => h(App),
}).$mount('#app');
