<template>
    <div><NavbarLanding/></div>
    <!-- <div class="eye-scroll" style="background-color: white;">

      <div class="eye-container">
        <Eye></Eye>
      </div>
      <div class="blank-space" style="height: 5000px;"></div>
    </div> -->
    <Eye></Eye>
    <LandingContent></LandingContent>
  </template>
  
  <script>
  import Eye from './eye3.vue';
  import NavbarLanding from '../../components/NavbarLanding.vue';
  import LandingContent from './landingContent.vue';
  
  export default {
    components: {
      Eye,
      NavbarLanding,
      LandingContent
    },
  };
  </script>
  