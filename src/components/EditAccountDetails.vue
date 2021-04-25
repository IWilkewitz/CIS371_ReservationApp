<template>
    <div id="edit-acccount-details">
        <div id="profile-information">
            <h1>EDIT MY ACCOUNT DETAILS</h1>
            <div class="details">
                <label>First Name:</label>
                <input type="text" v-model="firstName" placeholder="Enter Your First Name..."/>
            </div>
            <div class="details">
                <label>Last Name:</label>
                <input type="text" v-model="lastName" placeholder="Enter Your Last Name..."/>
            </div>
            <div class="details">
                <label>Phone Number:</label>
                <input type="text" v-model="phoneNumber" placeholder="(XXX) XXX - XXXX"/>
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
    private uid = "none";
    readonly $router!: any;
    private accountDetails: any[] = [];
    private firstName = "";
    private lastName = "";
    private phoneNumber = "";


    mounted(): void {
        this.uid = this.$appAuth.currentUser?.uid ?? "none";
        console.log(this.uid)
    }

    editAccountDetails(): void {
        
        this.$appDB.collection('users').doc(this.uid).collection('profile-information').doc('info').update({
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
    margin: auto;
    width: 50%;
    padding-top:25px;
}

#profile-information input {
  float: right;
  width: 50%;
}

#profile-information label {
  text-align: left;
  font-weight: bold;
}

#profile-information input::placeholder {
  text-align: right;
  letter-spacing: 0;
}

p {
    text-align: center;
}

#profile-information p {
  text-align: left;
}

#profile-information h1 {
  letter-spacing: 0.75px;
  font-weight: bold;
  margin: 0;
  margin-bottom: 40px;
}

#profile-information button {
  width: 65%;
  border: 1px solid;
  border-radius: 20px;
  letter-spacing: 0.1rem;
  padding: 0.5em;
  font-size: 15px;
  color: black;
  outline: none;
  background:gray;
  color: white;
  margin-top: 10px;
  margin-bottom: 2px;
}


</style>