<template>

<section class="bg-center bg-no-repeat bg-[url('https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&q=80&w=1740&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-gray-700 bg-blend-multiply">
    <div class="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
        <div class="grid grid-cols-2">
            <div class="firstheading">
                <h1 class="mb-4 text-4xl font-extrabold inline-flex text-white md:text-5xl lg:text-6xl">Hello Ralph,</h1>
                <h2 class="text-white">How can we help you plan your next trip?</h2>
            </div>
            <div class="theillustration">
                <!-- <img
                class="image w-80 h-auto" 
                src="../components/headerimages/persontravelling.svg">-->
                <Vue3Lottie :animationData="LottieJSON" :height="300" :width="300" />
            </div>
        </div>
    </div>
</section>

</template>

<script>
import { Vue3Lottie } from 'vue3-lottie'

import LottieJSON from '../assets/lottie/Lottie.json'

export default {
  components: {
    Vue3Lottie,
  },
  data() {
    return {
      LottieJSON,
    }
  },
}
</script>