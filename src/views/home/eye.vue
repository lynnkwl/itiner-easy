<template>
    <div class="eye-container" @scroll="handleScroll">
      <div class="eye-scroll">
        <div
          class="eye-frame"
          v-for="(frame, index) in frames"
          :key="index"
          :style="frameStyle(index)"
        >
          <img :src="frameUrls[index]" alt="Eye Frame" class="eye-image" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        frames: [],
        frameUrls: [], // Array to store image URLs
        scrollPosition: 0,
      };
    },
    methods: {
      handleScroll() {
        // Update the scroll position
        this.scrollPosition = this.$el.scrollTop;
      },
      frameStyle(index) {
        const translateY = this.scrollPosition / 3 - index * 50; // Adjust the parallax effect as needed
        return {
          transform: `translateY(${translateY}px)`,
        };
      },
    },
    created() {
      // Generate an array of frame numbers (000 to 182)
      for (let i = 0; i <= 182; i++) {
        this.frames.push(String(i).padStart(3, "0"));
  
        // Generate the image URLs using relative paths (without @ symbol)
        this.frameUrls.push(`./assets/eye/${String(i).padStart(3, "0")}.jpg`);
      }
    },
  };
  </script>
  
  <style scoped>
  .eye-container {
    height: 100vh;
    overflow: hidden;
    position: relative;
  }
  
  .eye-scroll {
    display: flex;
    flex-direction: column;
  }
  
  .eye-frame {
    max-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.5s;
  }
  
  .eye-image {
    max-width: 100%;
  }
  </style>
  