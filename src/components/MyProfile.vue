<template>
    <div id="MyProfile">
        <h1>My Profile</h1>
            <div id="my-reservations" v-for="(z,pos) in reservations" :key="pos">
                <h2>My Reservations</h2>
                    <p>{{z.date}}</p>
                    <p>${{z.time}}</p>
                    <br/>
                    <button type="button" id="cancelReservation" v-on:click="cancelReservation()">Cancel Reservation</button>
            </div>
            <div id="account-details" v-for="(z, pos) in profileInfo" :key="pos">
                <h3>My Account Details</h3>
                <button type="button" id="edit" v-on:click="edit">Edit My Account</button>
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
                <label>Need to Change Your Password?</label>
                <br/>
                <button type="button" id="changePassword" v-on:click="changePassword()">Change Password</button>
            </div>

        
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import App from './components/App.vue';
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

    edit(): void {
        this.$router.push({ path: "/EditAccountDetails" });
        // or equivalently
        this.$router.push({ name: "EditAccountDetails" });
    }

    mounted(): void {
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