<script>
export default {
    props: {
        city: {
            type: String,
            required: true,
        },
        peopleontrip: {
            type: String,
            required: false,
        },
    },
    methods:{
        deleteTrip(){
            this.$emit("deletetrip")
        },
        goToTrip(){
            this.$emit("gototrip")
        }
    }

};
</script>

<template>
      <div class="bg-white p-5 snap-always snap-center text-center rounded flex-none shadow-lg">
        <img class="w-56 md:w-64"
          src="https://cdn.kimkim.com/files/a/images/11a9690afde1a50f9439e22aa8d564237970fb93/original-8ad1591102e554cd50d9e7cea18d990d.jpg">
        <h2 class="text-xl m-2">{{city}}</h2>
        <h3 class="text-base">{{peopleontrip}}</h3>
        <button class="btn btn-neutral ml-7 p-2 text-white btn-xs sm:btn-sm md:btn-md lg:btn-lg"
          @click="goToTrip()">Go
          to Trip</button>
        <button class="btn btn-neutral ml-7 p-2 text-white btn-xs sm:btn-sm md:btn-md lg:btn-lg"
          @click="deleteTrip()">Delete Trip</button>
      </div>
</template>
