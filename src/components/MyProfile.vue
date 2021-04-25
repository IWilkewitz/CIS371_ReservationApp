<template>
    <div id="MyProfile">
        <h1>MY PROFILE</h1>
        <p>View your reservations and account information.</p>
        <br/>
        <br/>
        <div class="grid-container">
            <div id="my-reservations" v-for="(z,pos) in resInfo" :key="pos">
                <h3>My Reservations</h3>
                <br/>
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
                <label>FIRST NAME:</label>
                {{z.firstName}}
                <br/>
                <label>LAST NAME:</label>
                {{z.lastName}}
                <br/>
                <label>PHONE NUMBER:</label>
                {{z.phone}}
                <br/>
                <button type="button" id="edit" class="btn btn-outline-success  my-sm-0" v-on:click="edit">Edit My Account Details</button>
                <button type="button" id="changePassword" class="btn btn-outline-success  my-sm-0" v-on:click="changePassword()">Change My Password</button>
            </div>
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
  margin-top: 25px;
}

.grid-container {
  display: grid;
  grid-template-columns: 0.5fr 1.5fr 1.5fr 0.5fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    ". my-reservations account-details ."
    ". my-reservations account-details ."
    ". . . .";
}

#MyProfile h3 {
  letter-spacing: 0.75px;
  font-weight: bold;
  margin: 0;
}

#MyProfile label {
  font-weight: bold
}

#MyProfile p {
  letter-spacing: 0.75px;
  font-weight: lighter;
  margin: 0;
}

#MyProfile h1 {
  margin-top: 25px;
  font-weight: bold;
}

#my-reservations {
    display:inline-block;
    padding: 1em;
    text-align: left;
    grid-area: my-reservations;
}

#account-details {
    display:inline-block;
    padding: 1em;
    text-align: left;
    grid-area: account-details;
}

#account-details button {
    margin: 0.25em;
}




</style>