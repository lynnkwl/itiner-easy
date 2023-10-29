<template>
    <div class="bg-gradient-to-b from-neutral-400 to-blue-200 w-full">
        <!--insert empty space-->
        <div class="h-screen"></div>
    </div>
    
    <div class="flex items-center justify-center h-screen" >
        <div class="col-lg-12">
            <div class="col">
                <h1 class="text-center">Itiner-easy</h1>
                <h2 class="text-center">Your one stop travel companion</h2>
                <img src="../../assets/goingmerry.gif">
            </div>
            <div class="col"><Vue3Lottie :animationData="LottieJSON" :height="700" :width="700" /></div>
        </div>
        
    </div>
    

    <div class="flex items-center justify-center bg-blue-200 pt-10">
    <h2 class="text-center">What we have to offer</h2>
    </div>
    <div class="flex items-center px-56 py-10 h-5/6 justify-center bg-gradient-to-b from-blue-200 to-sky-200">
        <div class="col-sm-6 col-lg-4">
            <Vue3Lottie :animationData="PlanningJSON" :height="200" :width="300" />
            <div class=" d-flex flex-column col-sm-12">
                <h3 class="mb-3 mt-3 text-center not-italic">Itinerary Generator</h3>
                <p class=" h5 text-center mx-10 ">No need to think about where to go again. We done all of that for you.</p>
            </div>
            
        </div>
        <div class="col-sm-6 col-lg-4">
            <Vue3Lottie :animationData="MoneyJSON" :height="200" :width="300" />
            <div class=" d-flex flex-column col-sm-12">
                <h3 class="mb-3 mt-3 text-center not-italic">Billbuddy</h3>
                <p class=" h5 text-center mx-10 ">Who owes who will never be a worry again. Let us take care of that for you.</p>
            </div>
            
        </div>
        <div class="col-sm-6 col-lg-4">
            <Vue3Lottie :animationData="ToolsJSON" :height="200" :width="300" />
            <div class=" d-flex flex-column col-sm-12">
                <h3 class="mb-3 text-center not-italic">Tools</h3>
                <p class=" h5 text-center mx-10">With our currency converter and translator, you will never feel lost again.</p>
            </div>
            
        </div>
    </div>
        
    <div class="flex items-center mx-auto h-screen justify-center bg-gradient-to-b from-sky-200 to-blue-200">
        <div class="col-lg-12">
            <h2 class="mb-3 text-center">What our Travelers have to say</h2>
            <testimonials></testimonials>
        </div>
    </div>

    <div class="flex items-center h-1/2 justify-center bg-gradient-to-b from-blue-200 to-base-100">
        <div class="col-lg-12 items-center justify-center py-96">
            <div class="my-10">
                <Vue3Lottie :animationData="EndingJSON" :height="500" :width="1500" />
            </div>
            <h2 class="mb-5 text-center">Ready to Supercharge Your Travel Planning?</h2>
            <div class="flex items-center justify-center">
                <router-link to="/sign-up"><button class="h-12 px-6 text-lg text-white transition-colors duration-150 bg-blue-400 rounded-full focus:shadow-outline hover:bg-blue-500 ">Sign Up</button></router-link>
            </div>
            
        </div>
    </div>
</template>

<script>
import { Vue3Lottie } from 'vue3-lottie'
import testimonials from '../../components/testimonials.vue'
import LottieJSON from '../../assets/lottie/Lottie.json'
import MoneyJSON from '../../assets/lottie/money.json'
import PlanningJSON from '../../assets/lottie/planning.json'
import ToolsJSON from '../../assets/lottie/tools.json'
import EndingJSON from '../../assets/lottie/ending.json'

export default {
  components: {
    Vue3Lottie,
    testimonials,

  },
  data() {
    return {
      LottieJSON,
      MoneyJSON,
      PlanningJSON,
      ToolsJSON,
      EndingJSON,
    }
  },
}
</script>

<style scoped>
</style>