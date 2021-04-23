<template>
    <div id="MyProfile">
        <h1>My Profile</h1>
            <div id="my-reservations" v-for="(z,pos) in resInfo" :key="pos">
                <h3>My Reservations</h3>
                <label>Restaurant Name:</label>
                {{z.restaurantName}}
                <br/>
                <label>Reservation Date:</label>
                {{z.date}}
                <br/>
                <label>Reservation Time:</label>
                {{z.time}}
                <br/>
                <label>Number of Diners:</label>
                {{z.numDiners}}
                <br/>
                    
                    <br/>
                    <button type="button" id="cancelReservation" class="btn btn-outline-success" v-on:click="cancelReservation()">Cancel Reservation</button>
            </div>
            <div id="account-details" v-for="(z, pos) in profileInfo" :key="pos">
                <h3>My Account Details</h3>
                
                <br/>
                <label>First Name:</label>
                {{z.firstName}}
                <br/>
                <label>Last Name:</label>
                {{z.lastName}}
                <br/>
                <label>Phone Number:</label>
                {{z.phone}}
                <br/>
                <button type="button" id="edit" class="btn btn-outline-success  my-sm-0" v-on:click="edit">Edit My Account</button>
                <br/>
                <br/>
                <label>Need to Change Your Password?</label>
                <br/>
                <button type="button" id="changePassword" class="btn btn-outline-success  my-sm-0" v-on:click="changePassword()">Change Password</button>
            </div>

        
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
//import App from './components/App.vue';
import { FirebaseAuth, UserCredential } from "@firebase/auth-types";
import {
  FirebaseFirestore,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from "@firebase/firestore-types";


@Component({
  components: {
  },
})
export default class MyProfile extends Vue {
  
    readonly $appAuth!: FirebaseAuth;
    private uid = "none";
    readonly $router!: any;
    readonly $appDB!: FirebaseFirestore;
    private profileInfo: any[] = [];
    private resInfo: any[] = [];

    edit(): void {
        this.$router.push({ path: "/EditAccountDetails" });
        // or equivalently
        this.$router.push({ name: "EditAccountDetails" });
    }

    mounted(): void {
        console.log(this.$appDB.collection('users').doc(this.uid).collection('profile-information').doc('info'))

        

        this.uid = this.$appAuth.currentUser?.uid ?? "none";
        this.$appDB.collection(`users/${this.uid}/profile-information`)
        .onSnapshot((qs: QuerySnapshot) => {
        this.profileInfo.splice(0);
        qs.forEach((qds: QueryDocumentSnapshot) => {
          if (qds.exists) {
            const userData = qds.data();
            this.profileInfo.push({
              firstName: userData.firstName,
              lastName: userData.lastName,
              phone: userData.phone
            });
          }
        });
      });

      this.uid = this.$appAuth.currentUser?.uid ?? "none";
        this.$appDB.collection(`users/${this.uid}/res-information`)
        .onSnapshot((qs: QuerySnapshot) => {
        this.resInfo.splice(0);
        qs.forEach((qds: QueryDocumentSnapshot) => {
          if (qds.exists) {
            const resData = qds.data();
            this.resInfo.push({
              restaurantName: resData.restaurantName,
              date: resData.date,
              time: resData.time,
              numDiners: resData.numDiners
            });
          }
        });
      });

      
    }

}
</script>

<style>
#MyProfile {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#my-reservations {
    display:inline-block;
    border: 3px solid black;
    border-radius: 1.5em;
    padding: 1em;
    text-align: left;
}

#account-details {
    display:inline-block;
    border: 3px solid black;
    border-radius: 1.5em;
    padding: 1em;
    text-align: left;
}




</style>