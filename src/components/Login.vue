<template>
  <div id=login>
    <div id="user-login">
      <h3>LOGIN</h3>
      <p>Please enter the email and password associated with your account.</p>
      <br/>
      <input type="text" v-model="userEmail" placeholder="Email" />
      <br />
      <br />
      <input type="password" v-model="userPassword" placeholder="Password" />
      <br />
      <br />
      <button :disabled="noInput" v-on:click="authenticate">LOGIN</button>
      <br />
      <br />
      <p>Don't have a registered account?</p>
      <button :disabled="noInput" v-on:click="createAccount">
        CREATE ACCOUNT
      </button>
      <br />
      <br />
      <div>{{ message }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { FirebaseAuth, UserCredential } from "@firebase/auth-types";
import { FirebaseFirestore } from "@firebase/firestore-types";

@Component
export default class Login extends Vue {
  readonly $appAuth!: FirebaseAuth;
  private userEmail = "";
  private userPassword = "";
  private message = "";
   readonly $router!: any;
   readonly $appDB!: FirebaseFirestore;

  get noInput(): boolean {
    return this.userEmail.length === 0 || this.userPassword.length === 0;
  }

  createAccount(): void {
    this.$appAuth
      .createUserWithEmailAndPassword(this.userEmail, this.userPassword)
      .then((u: UserCredential) => {
        this.showMessage(`User create UID ${u.user?.uid}`);
        //THIS CREATES BLANK PROFILE TO BE UPDATED LATER
        this.$appDB.collection('users').doc(u.user?.uid).collection('profile-information').doc('info').set({
            firstName: '',
            lastName: '',
            phone: '',
        });
        //THIS CREATES BLANK RES SHEET TO BE UPDATED LATER
        this.$appDB.collection('users').doc(u.user?.uid).collection('res-information').doc('reservations').set({
            restaurantName: '',
            date: '',
            time: '',
            numDiners: ''
        });
      })
      .catch((err: any) => {
        this.showMessage(`Unable to create account ${err}`);
      });

      
    // In createAccount()
    //this.$router.push({ path: "/Home" });
    // or equivalently
    //this.$router.push({ name: "Home" });
  }

  authenticate(): void {
    this.$appAuth
      .signInWithEmailAndPassword(this.userEmail, this.userPassword)
      .then((u: UserCredential) => {
        this.showMessage(`Login successful UID ${u.user?.uid}`);
        this.$router.push({ path: "/" });
      })
      .catch((err: any) => {
        this.showMessage(`Unable to login ${err}`);
      });
    // In authenticate()
    //this.$router.push({ path: "/Home" });
    // or equivalently
    //this.$router.push({ name: "Home" });
  }

  showMessage(m: string): void {
    this.message = m;
    setTimeout(() => {
      // Auto disappear after 5 seconds
      this.message = "";
    }, 5000);
  }
}
</script>

<style>
#user-login {
  font-size: 80%;
  border-radius: 20px;
  letter-spacing: 0.5px;
  padding-top: 3em;
  padding-bottom: 3em;
  padding-left: 6em;
  padding-right: 6em;
  display: inline-block;
  background: white;
  margin-top:200px;
  margin-left: 550px;
  box-shadow: 7px 7px 11px 0px rgba(0,0,0,0.5);
  
}

#login {
  background-image: url('~@/assets/image_stockphoto.jpg');
  background-size: cover;
  padding-bottom:275px;
}

#user-login h3 {
  text-align: center;
  font-weight: bolder;
  font-size: 35px;
  color: #545567;
}

#user-login p {
  text-align: center;
  font-size: 1em;
  font-style: italic;
  color: #545567;
}

#user-login button {
  width: 75%;
  border: 1px solid;
  border-radius: 20px;
  letter-spacing: 0.1rem;
  padding: 0.5em;
  font-size: 15px;
  color: black;
  outline: none;
  background: #FF5963;
  color: white;
}

#user-login input {
  text-align: center;
  padding: 0.75em;
  width: 75%;
  border: 1px solid #FF5963;
  border-radius: 5px;
  background: white;
}

::placeholder {
  text-align: center;
  letter-spacing: 0.1rem;
}
</style>
