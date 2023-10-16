<template>
    <div>
      <!-- Your parent component's template content here -->
      <Eye></Eye>
    </div>
  </template>
  
  <script>
  import Eye from './eye.vue'; // Import the Eye component
  
  export default {
    components: {
      Eye, // Register the Eye component
    },
    // Rest of your parent component's script
  };
  </script>
  