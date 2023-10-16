<template>
    <div class="eye-scroll">
      <div class="blank-space" style="height: 5000px;"></div>
      <div class="eye-container">
        <Eye></Eye>
      </div>
      <div class="blank-space" style="height: 5000px;"></div>
    </div>
  </template>
  
  <script>
  import Eye from './eye.vue';
  
  export default {
    components: {
      Eye,
    },
  };
  </script>
  