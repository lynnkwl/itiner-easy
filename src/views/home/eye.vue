<template>
    <div class="eye-container" @scroll="handleScroll">
      <div class="eye-frame" v-for="(frame, index) in frames" :key="index" :class="{ 'is-revealed': frame === activeFrame }">
        <img :src="require(`@/assets/eye/${frame}.jpg`)" alt="Eye Frame" />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        frames: [],
        activeFrame: null,
      };
    },
    methods: {
      handleScroll() {
        // Calculate the current active frame based on scroll position
        const frameIndex = Math.floor((this.$el.scrollTop / this.$el.scrollHeight) * 182);
        this.activeFrame = this.frames[frameIndex];
      },
    },
    created() {
      // Generate an array of frame numbers (000 to 182)
      for (let i = 0; i <= 182; i++) {
        this.frames.push(String(i).padStart(3, "0"));
      }
    },
  };
  </script>
  
  <style scoped>
  .eye-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: auto; /* Allow the component to scroll */
  }
  
  .eye-frame {
    width: 25%; /* Adjust the width as needed */
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s, transform 0.5s;
  }
  
  .eye-frame.is-revealed {
    opacity: 1;
    transform: translateY(0);
  }
  </style>
  