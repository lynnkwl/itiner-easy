<template>
    <h1>Hello</h1>
    <h2>Hello 2</h2>
    <h3>Hello 3</h3>
    <h4>Hello 4</h4>
    <div class="card">
        <a class="card-title">
            hello this is a card
        </a>
        <a class="card-action">
            this is my card body
        </a>
    </div>
    <button class="btn" @click="logout">Log Out</button>
</template>

<script>
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('User is signed in', user.uid + " " + user.email)
        const uid = user.uid;
    } else {
        console.log('User is signed out')
    }
});
export default {
    name: "Profile",
    methods: {
        logout() {
            console.log("logging out")
            signOut(auth).then(() => {
                // Sign-out successful.
                console.log("signed out")
            }).catch((error) => {
                // An error happened.
                console.log("error signing out", error)
            });
        }
    }
}

</script>