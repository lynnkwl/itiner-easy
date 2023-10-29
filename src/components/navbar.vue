<template>
    
    <!-- <div class=" bg-[#5072A7] text-gray-100 py-3.5 px-6 shadow md:flex justify-between items-center">
        <div class="flex items-center cursor-pointer">
            <span class="text-blue-600 text-x1 mr-1">
                <router-link to="/"><img class="h-20 w-20" src="./logo/itiner-easy.svg"></router-link>
            </span>
        </div>
        <span @click="MenuOpen" class="absolute md:hidden right-6 top-5 cursor-pointer text-4xl">
            <i :class="['bi', opened ? 'bi-x' : 'bi-filter-left']"></i>
        </span>
        <div>
            <ul class="md:flex md:items-center md:px-0 px-3 md:pb-0 pb-10 md:static absolute bg-[#5072A7] md:w-auto w-full top-20 duration-75 ease-in"
            :class="[ opened ? 'menu-open' : 'menu-close']">
                <li class="md:mx-4 md:my-0 my-6 " v-for="link in Links">
                    <router-link :to=link.linkz ><a @click="MenuOpen" class="text-2xl hover:text-blue">{{ link.name }}</a></router-link>
                </li>
            </ul>
        </div>
    </div> -->
    <div class="navbar font-navbar bg-[#5072A7]">
    <div class="navbar-start">
    <div class="dropdown">
      <label tabindex="0" class="btn bg-[#5072A7] btn-ghost hover:bg-[#6699CC] lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabindex="0" class="menu menu-sm bg-[#5072A7] text-white dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52">
        <li>
            <router-link to="/"><a>HOME</a></router-link>
        </li>
        <li>
            <router-link to="/itinerary"><a>ITINERARY</a></router-link>
        </li>
        <li>
          <a>TOOLS</a>
          <ul class="p-2">
            <li>
                <router-link to="/translator"><a>TRANSLATOR</a></router-link>
            </li>
            <li>
                <router-link to="/converter"><a>CONVERTER</a></router-link>
            </li>
          </ul>
        </li>
        <li>
            <router-link to="/billbuddy"><a>BILLBUDDY</a></router-link>
        </li>
      </ul>
    </div>
    <div class="flex items-center cursor-pointer">
        <span class=" mr-1">
            <router-link to="/"><img class="h-20 w-20" src="./logo/itiner-easy.svg"></router-link>
        </span>
    </div>
  </div>
  <div class="navbar-center hidden lg:flex">
    <ul class="menu text-white hover:text-white text-m menu-horizontal px-1">
      <li>
        <router-link to="/"><a>HOME</a></router-link>
      </li>
      <li>
            <router-link to="/itinerary"><a>ITINERARY</a></router-link>
      </li>
      <li style="z-index:2" tabindex="0">
        <details>
          <summary><a>TOOLS</a></summary>
          <ul class="p-2 bg-[#5072A7]">
            <li>
                <router-link to="/translator"><a>TRANSLATOR</a></router-link>
            </li>
            <li>
                <router-link to="/converter"><a>CONVERTER</a></router-link>
            </li>
          </ul>
        </details>
      </li>
      <li>
            <router-link to="/billbuddy"><a>BILLBUDDY</a></router-link>
      </li>
    </ul>
  </div>
  <div class="navbar-end">
    <router-link to="/profile">
      <span class="btn border-none hover:bg-[#6699CC] bg-[#5072A7]">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
      </svg>
      </span>
    </router-link>
  </div>
</div>
</template>


<script>
import { onMounted, ref } from 'vue';
import Button from './button.vue'
import router from '../router/index.js';


export default {
    components:{
        Button
    },
    setup(){
        var opened = ref(false);
        let Links = [
            {name: "Home", linkz: "/"},
            {name: "Itinerary", linkz: "/itinerary"},
            {name: "Translator", linkz:"/translator"},
            {name: "Converter", linkz:"/converter"},
            {name:"Feed", linkz:"/feed"},
            {name:"Billbuddy", linkz:"/billbuddy"},
            {name:"Sign up", linkz:"/sign-up"},
            {name:"Sign in", linkz:"/sign-in"},
            {name:"Profile", linkz:"/profile"},
            {name:"Add Trip", linkz:"/add-trip"},
            {name:"Tools", linkz:"/tools"}
    ]
        function MenuOpen(){
            opened.value = !opened.value;
        }
        return {Links,opened, MenuOpen}
    }
    
}
</script>

<style>
  a{
    color:white;
  }
</style>