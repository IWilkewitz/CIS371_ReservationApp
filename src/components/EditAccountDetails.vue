<template>
    <div id="edit-acccount-details">
        <div id="profile-information">
            <h2>Edit Account Details</h2>
            <div class="details">
                <label>First Name:</label>
                <input type="text" v-model="firstName" placeholder="First Name"/>
            </div>
            <div class="details">
                <label>Last Name:</label>
                <input type="text" v-model="lastName" placeholder="Last Name"/>
            </div>
            <div class="details">
                <label>Phone Number:</label>
                <p>Please enter in the form of xxx-xxx-xxxx</p>
                <input type="text" v-model="phoneNumber" placeholder="Phone Number"/>
            </div>
            <button v-on:click="editAccountDetails">Save Changes</button>
            <button v-on:click="back">Back</button>
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
    private accountDetails: any[] = [];
    private firstName = "";
    private lastName = "";
    private phoneNumber = "";


    editAccountDetails(): void {
    this.$appDB.collection(`users`).add({
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phoneNumber,
    });
  }

  back(): void {
      this.$router.push({ path: "/MyProfile" });
        // or equivalently
        this.$router.push({ name: "MyProfile" });
  }
}
</script>

<style>


#profile-information {
    display:inline-block;
    padding: 1em;
    text-align: left;
}

p {
    text-align: center;
}

</style>