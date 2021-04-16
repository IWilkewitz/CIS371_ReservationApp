<template>
  <div>
    <div>
      <div>
        <form class="form-inline my-2 my-lg-0">
          <input
            v-model="search"
            type="text"
            id="searchRest"
            placeholder="Enter restaurant name or cuisine type..."
            class="form-control mr-sm-2"
          /><button v-on:click="searchRest()" class="btn btn-outline-success my-2 my-sm-0">Search</button>
        </form>
      </div>
      <div id="restCards" v-for="(z, pos) in restaurants" :key="pos">
        <img :src="z.picture" alt="" style="width:300px;height:200px;" />
        <div id="restInfo">
          <h2>{{ z.name }}</h2>
          <h4>Address: {{ z.address }}</h4>
          <h4>Phone Number: {{ z.phone }}</h4>
          <h4>Cuisine: {{ z.cuisine }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { FirebaseAuth } from "@firebase/auth-types";
import {
  FirebaseFirestore,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from "@firebase/firestore-types";
@Component
export default class Home extends Vue {
  readonly $appDB!: FirebaseFirestore;
  readonly $appAuth!: FirebaseAuth;
  readonly $router!: any;
  private restaurants: any[] = [];
  private holdingArray: any[] = [];
  private search = "";

  searchRest(): void {
    var formInput = this.search;
    var newArray: any[] = [];
    if (this.holdingArray[0] != null) {
      this.restaurants = [...this.holdingArray];
    } else {
      this.holdingArray = [...this.restaurants];
    }
    if (formInput != "") {
      this.restaurants.forEach((element) => {
        if (
          element.name.toUpperCase() == formInput.toUpperCase() ||
          element.cuisine.toUpperCase() == formInput.toUpperCase()
        ) {
          newArray.push(element);
        }
        this.restaurants = newArray;
      });
    } else {
      this.restaurants = [...this.holdingArray];
    }
  }

  mounted(): void {
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
              phone: restData.phone,
              picture: restData.picture,
            });
          }
        });
      });
  }
}
</script>

<style>
#restCards {
  margin: 1em;
  display: inline-block;
  flex-direction: column;
}

#restCards h3 {
  text-align: left;
}

#restInfo {
  text-align: left;
}

img {
  vertical-align: middle;
}

#searchRest {
  width: 30%;

  margin-left: 35%;
  margin-right: .25em;
}
</style>
