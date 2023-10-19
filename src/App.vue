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
 <div class="navbar bg-blue-400">
  <div class="place-content-evenly flex-nowrap">
    <div class="flex-1">
    <a class="btn btn-lg btn-ghost normal-case text-xl"><img class="h-20 w-20" src="./components/logo/itiner-easy.svg"></a>
  </div>
    <ul class="menu menu-horizontal px-1">
      <button class="btn bg-inherit text-gray-900 text-xl hover:text-white hover:bg-inherit">Home</button>
      <button class="btn bg-inherit text-gray-900 text-xl hover:text-white hover:bg-inherit">Itinerary</button>
      <li>
        <details>
          <summary class="text-gray-900 text-xl hover:text-white focus:bg-blue-500">
            Tools
          </summary>
          <ul class="p-2 bg-blue-600 ">
            <li><a class="text-gray-900 text-lg hover:text-white ">Converter</a></li>
            <li><a class="text-gray-900 text-lg hover:text-white">Translator</a></li>
          </ul>
        </details>
      </li>
      <button class="btn bg-inherit text-gray-900 text-xl hover:text-white hover:bg-inherit">Feed</button>
      <button class="btn bg-inherit text-gray-900 text-xl hover:text-white hover:bg-inherit">BillBuddy</button>
      <button class="btn bg-inherit text-gray-900 text-xl hover:text-white hover:bg-inherit">Sign Up</button>
      <button class="underline btn bg-inherit text-white text-xl hover:text-blue-500 hover:bg-inherit">Sign In</button>

    </ul>
  </div>
</div>
</template>

<style scoped>

body {
  background-color: #05c8f7;
  height: 100vh;
}

/* LOGO */
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
  margin: 0;
  padding: 0;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

/* NAVBAR ELEMENTS */
.navbar-btn {
  display: flex-horizontal;
  background-color: #05c8f7;
  color: white;
  padding: 5px 5px;
  border-radius: 5px;
  text-decoration: none;
  margin: 0px 10px;
}
.navbar-btn:hover {
  text-decoration: underline;
  border: 1px solid #05c8f7;
}

.navbar {
  display: flex;
  background-color: #05c8f7;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  position: absolute;
  top: 5px;
}

.navbar-nav{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
}

</style>
