<template>
  <div>
    <div id="restaurant-container">
      <div id="restaurantEntry">
        <h1>ADD MY RESTAURANT</h1>
        <p>Enter the details of your restaurant below.</p>
        <br/>
        <br/>
        <div class="block">
          <input type="text" v-model="restName" placeholder="Restaurant Name" />
        </div>
        <div class="block">
          <input type="text" v-model="restaddress" placeholder="Restaurant Address" />
        </div>
        <div class="block">
          <input type="text" v-model="restZip" placeholder="Zip Code"/>
        </div>
        <div class="block">
          <input type="text" v-model="restPhoneNumber" placeholder="Phone Number (XXX) XXX - XXXX"/>
        </div>
        <div class="block">
          <input type="text" v-model="restCuisine" placeholder="Cuisine Type" />
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
  text-align: left;
  width: 100%;
  margin-bottom: 1em;
}

#restaurantEntry {
  margin: auto;
  width: 40%;
  padding-top:25px;
}

#restaurantEntry h1 {
  font-weight: bold;
  padding-top: 25px;
  color:cornflowerblue;
  font-size: 50px;

}


#restaurantEntry input {
  float: center;
  width: 100%;
  text-align: center;
  padding: 0.75em;
  border: 1px solid cornflowerblue;
  border-radius: 5px;
}

#restaurantEntry input::placeholder {
  text-align: center;
  letter-spacing: 0;
}

#restaurantEntry button {
  width: 75%;
  border: 1px solid cornflowerblue;
  border-radius: 20px;
  letter-spacing: 0.1rem;
  padding: 0.75em;
  font-size: 16px;
  color: white;
  outline: none;
  background: cornflowerblue;
}

#restaurant-container {
  background-image: url('~@/assets/blue-restaurant.jpg');
  background-size: cover;
  padding-bottom:118px;
}

</style>
