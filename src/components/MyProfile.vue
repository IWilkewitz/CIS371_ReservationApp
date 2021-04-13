<template>
    <div id="MyProfile">
        <h1>My Profile</h1>
        <div id="my-reservations">
            <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">My Reservations</h5>
                <h6 class="card-subtitle mb-2 text-muted">View or Change Your Current Reservation(s)</h6>
                <table>
                    <thead>
                        <tr>
                            <th>Date:</th>
                            <th>Time:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(z,pos) in reservations" :key="pos">
                            <td>{{z.date}}</td>
                            <td>${{z.time}}</td>
                        </tr>
                    </tbody>
                    <br/>
                <button type="button" id="cancelReservation" v-on:click="cancelReservation()">Cancel Reservation</button>
                </table>
            </div>
        </div>
            
        </div>
        <div id="account-details">
            <h3>My Account Details</h3>
            <button type="button" id="editAccountDetails" v-on:click="editAccountDetails()">Edit</button>
            <br/>
            <label>Name:</label>
            <br/>
            <label>Email:</label>
            <br/>
            <label>Phone Number:</label>
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

@Component({
  components: {
  },
})
export default class MyProfile extends Vue {
  
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