<template>
  <div>
    <div id="restaurantEntry">
      <h3>Add My Restaurant</h3>
      <!-- <img :src="picURL" /> -->
      <div class="block">
        <label>Restaurant Name</label>
        <input type="text" v-model="restName" />
      </div>
      <div class="block">
        <label>Address</label>
        <input type="text" v-model="restaddress" />
      </div>
      <div class="block">
        <label>Phone Number</label>
        <input type="text" v-model="restPhoneNumber" />
      </div>
      <div class="block">
        <label>Cuisine</label>
        <input type="text" v-model="restCuisine" />
      </div>
      <div class="block">
        <label>Picture URL</label>
        <input type="text" v-model="restPicture" />
      </div>
      <button v-on:click="addRestaurant" class="btn btn-outline-success  my-sm-0">Add</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { FirebaseFirestore } from "@firebase/firestore-types";
import { QueryDocumentSnapshot } from "@firebase/firestore-types";
import { QuerySnapshot } from "@firebase/firestore-types";
import { FirebaseAuth } from "@firebase/auth-types";
@Component
export default class MyRestaurant extends Vue {
  readonly $appDB!: FirebaseFirestore;
  private restName = "";
  private restaddress = "";
  private restPhoneNumber = "";
  private restCuisine = "";
  private restPicture = "";
  private picURL = "https://picsum.photos/400/300";

  addRestaurant(): void {
    this.$appDB.collection(`restaurants`).add({
      name: this.restName,
      address: this.restaddress,
      phone: this.restPhoneNumber,
      cuisine: this.restCuisine,
      picture: this.restPicture,
    });
  }
}
</script>


<style >
.block {
  display: inline-block;
  margin-left: 1em;
  text-align: left;
  width: 100%;
  margin-bottom: 1em;
}

#restaurantEntry {
  margin: auto;
  width: 18%;
}

</style>
