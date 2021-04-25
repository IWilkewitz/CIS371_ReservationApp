<template>
  <div id="featured-restaurants">
    <h1>FIND A RESTAURANT</h1>
    <p>Discover a restaurant near you by entering your zip code in the search bar below.</p>
    <div id="zipSearch" class="form-inline">
      <input
        type="input"
        v-model="userSearch"
        placeholder="Enter Your Zipcode..."
        id="findRes"
        class="form-control mr-sm-2"
        @keyup.enter="findRestaurant()"
      />
      <button
        type="button"
        id="findRestaurant"
        class="btn btn-outline-success  my-sm-0"
        v-on:click="findRestaurant()"
      >
        Search
      </button>
    </div>
    <br />
    <br />
    <div class="form-inline" v-if="showFilter" id="filter">
      <input
        v-model="search"
        
        type=""
        id="filterSearch"
        placeholder="Enter restaurant name or cuisine type..."
        class="form-control mr-sm-2"
        @keyup.enter="searchRest()"
      /><button
        v-on:click="searchRest()"
        class="btn btn-outline-success  my-sm-0"
        type="button"
      >
        Search
      </button>
    </div>
    <div id="Cards" v-for="(z, pos) in allRestaurants" :key="pos">
      <div id="results">
        <h4>{{ z.name.toUpperCase() }}</h4>
        <br/>
        <p>Phone Number: {{ z.phone }}</p>
        <p>Address: {{ z.address }}</p>
        <br/>
        <button
          type="button"
          class="btn btn-outline-success  my-sm-0"
          id="markAsFavorite"
          v-if="userLoggedIn()"
          v-on:click="markAsFavorite()"
        >
          Mark As Favorite
        </button>
        <button
          type="button"
          id="makeReservation"
          v-if="userLoggedIn()"
          v-on:click="makeReservation(z.address)"
          class="btn btn-outline-success  my-sm-0"
        >
          Make Reservation
        </button>
      </div>
      <div id="reservation" v-if="showRes == z.address">
        <h5>Current Reservations:</h5>
        <div v-for="(y, pos) in allReservations" :key="pos">
          <p v-if="checkLoc(z.address, y.resLocation)">
            Date: {{ y.resDate }} Time: {{ y.resTime }} Diners:
            {{ y.numDiners }}
          </p>
        </div>

        <h5>Reserve A Table:</h5>
        <input
          type="input"
          v-model="resDate"
          class="form-control mr-sm-2"
          placeholder="Enter Date (Month/Day/Year)"
        />
        <input
          type="input"
          v-model="resTime"
          class="form-control mr-sm-2"
          placeholder="Enter Desired Time"
        />
        <input
          type="input"
          v-model="resNum"
          class="form-control mr-sm-2"
          placeholder="Enter Number of Diners"
        />
        <button
          type="button"
          id="submitReservation"
          v-on:click="submitReservation(z.address, z.name)"
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
  address: string;
  zip: string;
  phone: string;
  cuisine: string;
}

@Component
export default class Home extends Vue {
  readonly $appDB!: FirebaseFirestore;
  readonly $appAuth!: FirebaseAuth;
  readonly $router!: any;
  private restaurantData: Restaurant[] = [];
  private userSearch = "";
  private showRes = "";
  private resDate = "";
  private resTime = "";
  private resNum = "";
  private allReservations: any[] = [];
  private uid = "none";
  private userFavorites: any[] = [];
  private restaurants: any[] = [];
  private holdingArray: any[] = [];
  private search = "";
  private allRestaurants: any[] = [];
  private showFilter = false;


  makeReservation(name: string): void {
    if (this.showRes == "") {
      this.showRes = name;
    } else {
      this.showRes = "";
    }
  }

  userLoggedIn(): boolean {
    return this.$appAuth.currentUser?.uid !== undefined;
  }

  checkArray(): boolean {
      if(this.allRestaurants[0] != undefined){
          return true;
      }
      return false;
  }

    //FILTERS
  searchRest(): void {
    var formInput = this.search;
    var newArray: any[] = [];
    if (this.holdingArray[0] != null) {
      this.allRestaurants = [...this.holdingArray];
    } else {
      this.holdingArray = [...this.allRestaurants];
    }
    if (formInput != "") {
      this.allRestaurants.forEach((element) => {
        if (
          element.name.toUpperCase().includes(formInput.toUpperCase()) ||
          element.cuisine.toUpperCase().includes(formInput.toUpperCase())
        ) {
          newArray.push(element);
        }
        this.allRestaurants = newArray;
      });
    } else {
      this.allRestaurants = [...this.holdingArray];
    }
  }

  submitReservation(address: string, name: string): void {
    this.$appDB.collection(`reservations`).add({
      resLocation: address,
      reservationTime: this.resTime,
      numDiners: this.resNum,
      resDate: this.resDate,
      reservedBy: this.uid
    });

    this.$appDB.collection('users').doc(this.uid).collection('res-information').doc('reservations').set({
            restaurantName: name,
            date: this.resDate,
            time: this.resTime,
            numDiners: this.resNum
        });

    this.resDate = "";
    this.resTime = "";
    this.resNum = "";
  }

  checkLoc(a: string, b: string): boolean {
    if (a === b) {
      return true;
    }
    return false;
  }

    //GET RESTAURANTS FROM API
  findRestaurant() {
    this.holdingArray = [];
    this.search = '';
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
          
        this.restaurantData = r.data.result.data.map(
            (x: any): Restaurant => {
                return {
                    name: x.restaurant_name,
                    address: x.address.street,
                    zip: x.postal_code,
                    phone: x.restaurant_phone,
                    cuisine: x.cuisines[0]
                }
            }
        )
        
        this.allRestaurants.splice(0);
        for (const [key, value] of Object.entries(this.restaurantData)) {
            this.allRestaurants.push({ restaurant: key, ...value });
        }

        this.restaurants.forEach(element => {
            if(element.zip == this.userSearch){
                this.allRestaurants.push(element);
            }
            //console.log(element.zip)
            console.log(this.search)
        })
        

        this.allRestaurants.forEach(element => {
            if(element.cuisine == undefined){
                element.cuisine = "N/A"
            }
        })
        
      });

      
      this.showFilter = true;
  }

  mounted(): void {
    this.showFilter = false;
    this.uid = this.$appAuth.currentUser?.uid ?? "none";
    //console.log(this.uid)
    //GET USER CREATED RESTAURANTS
    this.$appDB
      .collection("restaurants")
      .orderBy("name")
      .onSnapshot((qs: QuerySnapshot) => {
        this.restaurants.splice(0);
        qs.forEach((qds: QueryDocumentSnapshot) => {
          if (qds.exists) {
            const restData = qds.data();
            this.restaurants.push({
              name: restData.name,
              cuisine: restData.cuisine,
              address: restData.address,
              zip: restData.zip,
              phone: restData.phone,
            //   picture: restData.picture,
            });
          }
        });
      });

    //GET USER CREATED RESERVATIONS
    this.$appDB.collection("reservations").onSnapshot((qs: QuerySnapshot) => {
      this.allReservations.splice(0);
      qs.forEach((qds: QueryDocumentSnapshot) => {
        if (qds.exists) {
          const resData = qds.data();
          this.allReservations.push({
            resLocation: resData.resLocation,
            numDiners: resData.numDiners,
            resTime: resData.reservationTime,
            resDate: resData.resDate,
          });
        }
      });
    });

    this.restaurants.forEach((element) => {
      this.restaurantData.push(element);
    });

    // console.log(this.restaurants);
  }
}
</script>

<style>
#Cards {
  margin: 1em;
  display: inline-block;
  flex-direction: column;
  padding: 2em;
  box-shadow: 7px 8px 7px -4px rgba(0,0,0,0.3);
  border-radius: 10px;
  background: mintcream
}

#results h4 {
  font-weight: bolder;
}


#featured-restaurants h1 {
  padding-top: 55px;
  font-weight: bold;
  color: darkgreen;
  font-size: 50px;
}


#featured-restaurants p {
  letter-spacing: 0.75px;
  font-weight: lighter;
  margin: 0;
  
}

#featured-restaurants {
  background-image: url('~@/assets/green_food.jpg');
  background-size: cover;
  padding-bottom:500px;
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

#featured-restaurants button {
  margin: 0.25em;
}

#reservation input :not(#findRes) {
  margin: 2em;
}

#filter{
    margin: 1em;
    display: flex;
    justify-content: center;
}

#filterSearch{
    width: 30%;
  
}
</style>
