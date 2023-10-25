<template>
    
    <div class=" bg-blue-400 text-gray-100 py-3.5 px-6 shadow md:flex justify-between items-center">
        <div class="flex items-center cursor-pointer">
            <span class="text-blue-600 text-x1 mr-1">
                <router-link to="/"><img class="h-20 w-20" src="./logo/itiner-easy.svg"></router-link>
            </span>
        </div>
        <span @click="MenuOpen" class="absolute md:hidden right-6 top-5 cursor-pointer text-4xl">
            <i :class="['bi', opened ? 'bi-x' : 'bi-filter-left']"></i>
        </span>
        <div>
            <ul class="md:flex md:items-center md:px-0 px-3 md:pb-0 pb-10 md:static absolute bg-blue-400 md:w-auto w-full top-20 duration-75 ease-in"
            :class="[ opened ? 'menu-open' : 'menu-close']">
                <li class="md:mx-4 md:my-0 my-6 " v-for="link in Links">
                    <router-link :to=link.linkz ><a @click="MenuOpen" class="text-2xl hover:text-blue">{{ link.name }}</a></router-link>
                </li>
            </ul>
        </div>
    </div>
    
    <!-- <router-view /> -->
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

<style scoped>erer              hgfdszaáqwt                                                                                                                                c cxx
.menu-open {
    left: 0;
    z-index: 1;
    
}

.menu-close{
    left:100%;
}


</style>