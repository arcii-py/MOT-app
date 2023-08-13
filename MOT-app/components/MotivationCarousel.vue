<!-- components/GlassCarousel.vue -->

<template>
  <Carousel :autoplay="10000" :wrap-around="true">
    <Slide v-for="message in messages" :key="message">
      <div class="carousel__item"><p class="glass text-white font-bold text-3xl bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg">{{ message }}</p></div>
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>

<script>
import { defineComponent } from 'vue'
import { Carousel, Navigation, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

export default defineComponent({
  name: 'GlassCarousel',
  components: {
    Carousel,
    Slide,
    
    Navigation,
  },
  data() {
    return {
      messages: [
        "Believe in yourself and all that you are.",
        "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        "The future belongs to those who believe in the beauty of their dreams."
      ]
    }
  }
})
</script>

<style scoped>
.carousel__item {
  min-height: 200px;
  width: 100%;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('https://media.istockphoto.com/photos/luxurious-black-marble-texture-with-golden-veins-picture-id962532794?k=6&m=962532794&s=170667a&w=0&h=VMWzDF7cGKp1eshkpIAB0xDeQekPQGLTc1DVGcr4fzY=') no-repeat center/cover;

}

.glass {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 150px;
  width: 95%;
  border-radius: 4px;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
  
}
</style>
