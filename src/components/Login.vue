<template>
    <div id="user-login">
        <h3>Sign In</h3>
        <p>Please enter the email and password associated with your account.</p>
        <input type="text" v-model="userEmail" placeholder="Email">
        <br/>
        <br/>
        <input type="text" v-model="userPassword" placeholder="Password">
        <br/>
        <br/>
        <button :disabled="noInput" v-on:click="authenticate">Sign In</button>
        <br/>
        <br/>
        <p>Don't have an account?</p>
        <button :disabled="noInput" v-on:click="createAccount">Create an Account</button>
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
        // In createAccount()
        this.$router.push({ path: "/Home" });
        // or equivalently
        this.$router.push({ name: "Home" });
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
        // In authenticate()
        this.$router.push({ path: "/Home" });
        // or equivalently
        this.$router.push({ name: "Home" });
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
    font-size: 80%;
	border-top-left-radius: 5rem;
	border-top-right-radius: 5rem;
	border-bottom-right-radius: 5rem;
	border-bottom-left-radius: 5rem;
	letter-spacing: 0.1rem;
	font-weight: bold;
	padding-top: 1rem;
	padding-right: 1rem;
	padding-bottom: 1rem;
	padding-left: 1rem;
    display:inline-block;
}

h3 {
    text-align: center;
}

p {
    text-align: center;
    font-size: 0.90em;
    font-style: italic;
}

button {
	border-radius: 2em;
	letter-spacing: 0.1rem;
	font-weight: bold;
	padding: 0.5em;
    color:black;
}

input {
    text-align: center;
    padding: 0.5em;
}

</style>