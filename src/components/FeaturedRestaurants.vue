<template>
    <div id="featured-restaurants">
        <h1>Find a Restaurant Near Me</h1>
        <input type="input" v-model="userSearch" placeholder="Enter Your Zipcode..."/>
        <button type="button" id="findRestaurant" v-on:click="findRestaurant()">Search</button>
        <br/>
        <br/>
        <div id="Cards" v-for="(z, pos) in restaurantData" :key="pos">
            <div id="results">
                <h4>{{z.restaurant_name}}</h4>
                <h5>Phone Number: {{z.restaurant_phone}}</h5>
                <h5>Address: {{z.address.street}}</h5>
                <button type="button" id="markAsFavorite" v-on:click="markAsFavorite()">Mark As Favorite</button>
                <button type="button" id="makeReservation" v-on:click="makeReservation()">Make Reservation</button>
            </div>
        </div>

    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import axios from 'axios';
import { AxiosResponse } from 'axios';
import { FirebaseAuth } from "@firebase/auth-types";
import {
  FirebaseFirestore,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from "@firebase/firestore-types";

interface Restaurant {
  name: string;
  photo: string;
  awards: string;
  rating: number;
  openNow: string;
}


@Component
export default class FeaturedRestaurants extends Vue {
    readonly $appDB!: FirebaseFirestore;
    readonly $appAuth!: FirebaseAuth;
    private uid = "none"
    readonly $router!: any;
    private restaurantData: Restaurant[] = [];
    private userSearch = ""; 
    private userFavorites: any[] = [];

    mounted(): void {
        this.uid = this.$appAuth.currentUser?.uid ?? "none";
    }

    findRestaurant() {
        var url = 'https://us-restaurant-menus.p.rapidapi.com/restaurants/zip_code/' + this.userSearch;
        axios.get(url, {
           params: {page: '1', zipcode: this.userSearch},
            headers: {
                'x-rapidapi-key': 'f9aad7740emsh7bd03e23dc92856p1d233bjsn098eae4d44ca',
                'x-rapidapi-host': 'us-restaurant-menus.p.rapidapi.com'
            },
        })
        .then((r:AxiosResponse) =>{
            this.restaurantData = r.data.result.data
        })
        console.log(this.restaurantData);
    }

    markAsFavorite() {
        this.uid = this.$appAuth.currentUser?.uid ?? "none";
        this.$appDB.collection(`users/${this.uid}/my-favorites`)
        .onSnapshot((qs: QuerySnapshot) => {
        this.userFavorites.splice(0);
        qs.forEach((qds: QueryDocumentSnapshot) => {
          if (qds.exists) {
            const favorites = qds.data();
            this.userFavorites.push({
              name: favorites.restaurant_name,
              phone: favorites.restaurant_phone,
              address: favorites.address.street
            });
          }
        });
      });
    }

}
</script>


<style>

#Cards {
    margin: 1em;
    display: inline-block;
    flex-direction: column;
    border: solid;
    border-radius: 1em;
}
</style>