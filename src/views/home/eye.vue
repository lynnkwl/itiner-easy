<template>
  <div>
    <div class="eye-container" :style="{ transform: 'translateY(' + scrollPosition + 'px)' }">
      <div class="eye-frame">
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
      frameUrls: [`src/assets/eye/000.jpg`], // Array to store image URLs
      scrollPosition: 0,
      index: 0, // Index of the image to be displayed
    };
  },
  methods: {
  handleScroll() {
    // Calculate the maximum scroll position allowed
    const maxScrollPosition = (this.frames.length - 1) * 10;

    // Update the scroll position
    this.scrollPosition = Math.min(window.scrollY, maxScrollPosition);

    // Calculate the index of the image to be displayed
    const index = Math.floor(this.scrollPosition / 10);

    // Update the index and frameUrls data properties
    if (index !== this.index) {
      this.index = index;
      this.frameUrls = this.frames.map((frame) => `src/assets/eye/${frame}.jpg`);
    }
  },
},
  created() {
    // Generate an array of frame numbers (000 to 273)
    for (let i = 1; i <= 274; i++) {
      this.frames.push(String(i).padStart(3, "0"));
    }

    // Add an event listener for the 'scroll' event
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    // Remove the event listener when the component is destroyed
    window.removeEventListener('scroll', this.handleScroll);
  },
};

</script>

<style scoped>
.eye-container {
  height: 100vh;
  overflow: hidden;
  position: relative;
  margin-top: 0;
}

.eye-scroll {
  display: flex;
  flex-direction: column;
}

.eye-frame {
  height: 100vh; /* Match the viewport height */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.05s ease-out; /* Adjust the duration for a smoother effect */
}

.eye-image {
  max-width: 100%;
}
</style>
