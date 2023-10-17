<script setup>

import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import router from './router';

const isLoggedIn = ref(false);

let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    }
    else {
      isLoggedIn.value = false;
    }
  });
});

const handleSignOut = () => {
  signOut(auth).thenn(() => {
    router.push("/");
  })
};
</script>

<template>
  <nav>
    <nav class="navbar navbar-dark" style="background-color: #05c8f7;"
      aria-label="Second navbar example">
      <div class="container-fluid">

        <!-- <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample02"
          aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button> -->

        <div class="collapse navbar-collapse" id="navbarsExample02">
          <div class="navbar-nav me-auto">
            <router-link class='navbar-btn' to="/">Home</router-link>
            &nbsp; 
            <router-link class='navbar-btn' to="/itinerary">Itinerary</router-link> 
            &nbsp;
            <router-link class='navbar-btn' to="/toolpage">Tools</router-link> 
            &nbsp;
            <router-link class='navbar-btn' to="/feed">Feed</router-link> 
            &nbsp;
            <router-link class='navbar-btn' to="/billbuddy">BillBuddy</router-link> 
            &nbsp;
            <router-link class='navbar-btn' to="/register">Register</router-link> 
            &nbsp;
            <router-link class='navbar-btn' to="/sign-in">Login</router-link> 
            &nbsp;
            <router-link class='navbar-btn' style="color: blue;" to="/profile">Profile</router-link> 
          </div>
          <div class="position-absolute top-0 start-50 translate-middle-x">
            <a href="#"><img src="./components/logo/itiner-easy.svg" style="width: 100px; height: 100px; margin-top: -15px;"
                alt="itiner-easy logo"></a>
          </div>
        </div>
      </div>
    </nav>


    <button @click="handleSignOut" v-if="isLoggedIn">Sign Out</button>
  </nav>
  <router-view />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.navbar-btn {
  display: flex-horizontal;
  background-color: #05c8f7;
  color: white;
  padding: 5px 5px;
  border-radius: 5px;
  text-decoration: none;
}

.navbar {
  display: flex;
  background-color: #05c8f7;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  margin: auto;
  justify-content: center;
  align-items: center;
}

.nav-item{
  list-style-type:none;
}
</style>
