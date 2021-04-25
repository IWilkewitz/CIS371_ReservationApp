<template>
  <div>
    <div id="restaurantEntry">
      <h1>ADD MY RESTAURANT</h1>
      <br/>
      <br/>
      <div class="block">
        <label>Restaurant Name</label>
        <input type="text" v-model="restName" placeholder="Enter Restaurant Name..." />
      </div>
      <div class="block">
        <label>Address</label>
        <input type="text" v-model="restaddress" placeholder="Enter Restaurant Address..." />
      </div>
      <div class="block">
        <label>Zip Code</label>
        <input type="text" v-model="restZip" placeholder="Enter Zip Code..."/>
      </div>
      <div class="block">
        <label>Phone Number</label>
        <input type="text" v-model="restPhoneNumber" placeholder="(XXX) XXX - XXXX"/>
      </div>
      <div class="block">
        <label>Cuisine</label>
        <input type="text" v-model="restCuisine" placeholder="Enter Cuisine Type..." />
      </div>
      <br/>
      <br/>
      <!-- <div class="block">
        <label>Picture URL</label>
        <input type="text" v-model="restPicture" />
      </div> -->
      <button v-on:click="addRestaurant" class="btn btn-outline-success  my-sm-0">Add Restaurant</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { FirebaseFirestore } from "@firebase/firestore-types";
import { QueryDocumentSnapshot } from "@firebase/firestore-types";
import { QuerySnapshot } from "@firebase/firestore-types";
import { FirebaseAuth } from "@firebase/auth-types";
@Component
export default class MyRestaurant extends Vue {
  readonly $appDB!: FirebaseFirestore;
  readonly $appAuth!: FirebaseAuth;
  private restName = "";
  private restaddress = "";
  private restZip = '';
  private restPhoneNumber = "";
  private restCuisine = "";
  private restPicture = "";
  private uid = "none";
  

 


  addRestaurant(): void {
    this.$appDB.collection(`restaurants`).add({
      name: this.restName,
      address: this.restaddress,
      zip: this.restZip,
      phone: this.restPhoneNumber,
      cuisine: this.restCuisine
      // picture: this.restPicture,
    });
  }

  

  mounted(): void {
    this.uid = this.$appAuth.currentUser?.uid ?? "none";
    console.log(this.uid)
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
  width: 30%;
  padding-top:25px;
}

#restaurantEntry h1 {
  font-weight: bold;

}


#restaurantEntry input {
  float: right;
  width: 70%;
}

#restaurantEntry input::placeholder {
  text-align: right;
  letter-spacing: 0;
}

</style>
