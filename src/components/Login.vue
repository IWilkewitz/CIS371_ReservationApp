<template>
    <div id="user-login">
        <h3>Log Into Your Account</h3>
        <p>In order to log in, please enter the email and password associated with your account.</p>
        <label>Email:</label>
        <input type="text" v-model="userEmail" placeholder="Enter Your Email">
        <br/>
        <br/>
        <label>Password:</label>
        <input type="text" v-model="userPassword" placeholder="Enter Your Password">
        <br/>
        <br/>
        <button :disabled="noInput" v-on:click="createAccount">Create an Account</button>
        <br/>
        <br/>
        <button :disabled="noInput" v-on:click="authenticate">Sign In</button>
        <br/>
        <br/>
        <div>{{message}}</div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { FirebaseAuth, UserCredential } from "@firebase/auth-types";

@Component

export default class Login extends Vue {

    readonly $appAuth!: FirebaseAuth;
    private userEmail = "";
    private userPassword = "";
    private message = "";

    get noInput(): boolean {
    return this.userEmail.length === 0 || this.userPassword.length === 0;
    }

    createAccount(): void {
    this.$appAuth
        .createUserWithEmailAndPassword(this.userEmail, this.userPassword)
        .then((u: UserCredential) => {
        this.showMessage(`User create UID ${u.user?.uid}`);
        })
        .catch((err: any) => {
        this.showMessage(`Unable to create account ${err}`);
        });    
    }

    authenticate(): void {
    this.$appAuth
        .signInWithEmailAndPassword(this.userEmail, this.userPassword)
        .then((u: UserCredential) => {
        this.showMessage(`Login successful UID ${u.user?.uid}`);
        })
        .catch((err: any) => {
        this.showMessage(`Unable to login ${err}`);
        });
    }

    showMessage(m: string): void {
    this.message = m;
    setTimeout(() => {    // Auto disappear after 5 seconds
        this.message = "";
    }, 5000);
    }

}
</script>

<style>

#user-login {
    display:inline-block;
    border: 3px solid black;
    border-radius: 1.5em;
    padding: 1em;
    text-align: left;
}

h3, p {
    text-align: center;
}
</style>