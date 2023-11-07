<template>
    <div class="flex flex-col justify-center items-center">
        <Vue3Lottie :animationData="notFoundJSON" :height="500" />
        <h2 class="mt-10">The page you are looking for does not exist :( </h2>
    </div>
</template>
  
<script>
import { Vue3Lottie } from 'vue3-lottie';
import notFoundJSON from '../assets/lottie/404.json'

export default{
    components:{
        Vue3Lottie,
    },
    data(){
        return{
            notFoundJSON,
        }
    },
    methods:{

    }
}
</script>