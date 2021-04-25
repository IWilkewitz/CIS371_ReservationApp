<template>
    <div id="details-container">
        <div id="edit-acccount-details">
            <div id="profile-information">
                <h1>EDIT ACCOUNT</h1>
                <div class="details">
                    <input type="text" v-model="firstName" placeholder="First Name"/>
                </div>
                <div class="details">
                    <input type="text" v-model="lastName" placeholder="Last Name"/>
                </div>
                <div class="details">
                    <input type="text" v-model="phoneNumber" placeholder="Phone Number (XXX) XXX - XXXX"/>
                </div>
                <button v-on:click="editAccountDetails">Save Changes</button>
                <button v-on:click="back">Back</button>
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
    background: white;
    padding-top: 3em;
    padding-bottom: 3em;
    padding-left: 6em;
    padding-right: 6em;
    box-shadow: 7px 7px 11px 0px rgba(0,0,0,0.5);
    border-radius: 20px;
}


#profile-information input {
  float: right;
  width: 100%;
  text-align: center;
  padding: 0.75em;
  border: 1px solid orange;
  border-radius: 5px;
  margin-bottom: 1em;
}

#profile-information label {
  text-align: left;
  font-weight: bold;
  float: left;
}

#profile-information input::placeholder {
  text-align: center;
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
  padding-top:75px;
  font-size:50px;
  color: orange;
}


#profile-information button {
  width: 75%;
  border: 1px solid lightgray;
  border-radius: 20px;
  letter-spacing: 0.1rem;
  padding: 0.75em;
  font-size: 16px;
  color: white;
  outline: none;
  background: orange;
  margin-top: 10px;
  margin-bottom: 2px;
}

#details-container {
  background-image: url('~@/assets/food_plates.jpg');
  background-size: cover;
  padding-bottom:350px;
}


</style>