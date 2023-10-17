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
    <nav class="navbar navbar-expand-sm navbar-dark" style="background-color: #05c8f7;"
      aria-label="Second navbar example">
      <div class="container-fluid">

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample02"
          aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarsExample02">
          <div class="navbar-nav me-auto">
            <router-link to="/"> Home </router-link> |
            <router-link to="/itinerary"> Itinerary </router-link> |
            <router-link to="/toolpage"> Tools </router-link> |
            <router-link to="/feed"> Feed </router-link> |
            <router-link to="/billbuddy"> BillBuddy </router-link> |
            <router-link to="/register"> Register </router-link> |
            <router-link to="/sign-in"> Login </router-link> |
          </div>
          <div class="position-absolute top-0 start-50 translate-middle-x">
            <a href="#"><img src="./components/logo/itiner-easy.svg" style="width: 100px; height: 100px; margin-top: -15px;"
                alt="itiner-easy logo"></a>
          </div>
          <ul class="navbar-nav pull-right">
            <li class="nav-item">
              <a class="nav-link rounded"
                style="background-color: white; color: #05c8f7; padding-left: 20px; padding-right: 20px;"
                href="#"><router-link to="/profile"> Profile </router-link></a>
            </li>
          </ul>
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
</style>
