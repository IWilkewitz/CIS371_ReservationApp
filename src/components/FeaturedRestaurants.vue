<template>
  <div id="featured-restaurants">
    <h1>Find a Restaurant Near Me</h1>
    <div id="zipSearch" class="form-inline">
    <input
      type="input"
      v-model="userSearch"
      placeholder="Enter Your Zipcode..."
      id="findRes"
      class="form-control mr-sm-2"
      @keyup.enter="findRestaurant()"
    />
    <button type="button" id="findRestaurant" class="btn btn-outline-success  my-sm-0" v-on:click="findRestaurant()">
      Search
    </button>
    </div>
    <br />
    <br />
    <div id="Cards" v-for="(z, pos) in restaurantData" :key="pos">
      <div id="results">
        <h4>{{ z.restaurant_name }}</h4>
        <h5>Phone Number: {{ z.restaurant_phone }}</h5>
        <h5>Address: {{ z.address.street }}</h5>
        <button type="button" class="btn btn-outline-success  my-sm-0" id="markAsFavorite" v-on:click="markAsFavorite()">
          Mark As Favorite
        </button>
        <button
          type="button"
          id="makeReservation"
          v-on:click="makeReservation(z.restaurant_name)"
          class="btn btn-outline-success  my-sm-0"
        >
          Make Reservation
        </button>
      </div>
      <div id="reservation" v-if="showRes == z.restaurant_name">
        <h5>Current Reservations:</h5>
            <div v-for="(y, pos) in allReservations" :key="pos">
                <p v-if="checkLoc(z.address.street, y.resLocation)">Date: {{y.resDate}} Time: {{y.resTime}} Diners: {{y.numDiners}}</p>
            </div>
        
        <h5>Reserve A Table:</h5>
        <input type="input" v-model="resDate" class="form-control mr-sm-2" placeholder="Enter Date (Month/Day/Year)" />
        <input type="input" v-model="resTime" class="form-control mr-sm-2" placeholder="Enter Desired Time" />
        <input type="input" v-model="resNum" class="form-control mr-sm-2" placeholder="Enter Number of Diners" />
        <button
          type="button"
          id="submitReservation"
          v-on:click="submitReservation(z.address.street)"
          class="btn btn-outline-success  my-sm-0"
        >
          Submit Reservation
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import axios from "axios";
import { AxiosResponse } from "axios";
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
  readonly $router!: any;
  private restaurantData: Restaurant[] = [];
  private userSearch = "";
  private showRes = "";
  private resDate = '';
  private resTime = '';
  private resNum = '';
  private allReservations: any[] = [];
    private uid = "none"
    private userFavorites: any[] = [];

    
        

  makeReservation(name: string): void {
    if (this.showRes == "") {
      this.showRes = name;
    } else {
      this.showRes = "";
    }
  }

  submitReservation(address: string): void{
      this.$appDB.collection(`reservations`).add({
          resLocation: address,
          reservationTime: this.resTime,
          numDiners: this.resNum,
          resDate: this.resDate
    });

    this.resDate = "";
    this.resTime = "";
    this.resNum = "";
  }

  checkLoc(a: string, b: string): boolean {
      if(a === b){
          return true;
      }
      return false;
  }

  findRestaurant() {
    var url =
      "https://us-restaurant-menus.p.rapidapi.com/restaurants/zip_code/" +
      this.userSearch;
    axios
      .get(url, {
        params: { page: "1", zipcode: this.userSearch },
        headers: {
          "x-rapidapi-key":
            "f9aad7740emsh7bd03e23dc92856p1d233bjsn098eae4d44ca",
          "x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
        },
      })
      .then((r: AxiosResponse) => {
        this.restaurantData = r.data.result.data;
      });
    console.log(this.restaurantData);
  }

  mounted(): void {
      this.uid = this.$appAuth.currentUser?.uid ?? "none";
    
      this.$appDB
      .collection("reservations")
      .onSnapshot((qs: QuerySnapshot) => {
        this.allReservations.splice(0);
        qs.forEach((qds: QueryDocumentSnapshot) => {
          if (qds.exists) {
            const resData = qds.data();
            this.allReservations.push({
              resLocation: resData.resLocation,
              numDiners: resData.numDiners,
              resTime: resData.reservationTime,
              resDate: resData.resDate
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
  padding: 1em;
}

/* #findRes{
    width:22%;
    margin-left: 35%;
  margin-right: .25em;
} */

#zipSearch {
    display: flex;
    justify-content: center;
}

#featured-restaurants button{
    margin: .25em;
}

#reservation input :not(#findRes){
    margin: 2em;
}
</style>
