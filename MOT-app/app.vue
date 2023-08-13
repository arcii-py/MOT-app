<template>
  <NavigationFlex />
  <HerroCounter />
  <MotivationCarousel />
  <SendNotification />
</template>

<script>
import NavigationFlex from '~/components/NavigationFlex.vue';
import HerroCounter from '~/components/HerroCounter.vue';

export default {
  components: {
    NavigationFlex,
    HerroCounter
  },
}
</script>
