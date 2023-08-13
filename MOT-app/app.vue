<template>
  <VitePwaManifest/>
  <NavigationFlex />
  <HerroCounter />
  <MotivationCarousel />
  <SendNotification />
</template>

<script>
import NavigationFlex from '~/components/NavigationFlex.vue';
import HerroCounter from '~/components/HerroCounter.vue';
import SendNotification from '~/components/SendNotification.vue';
import MotivationCarousel from '~/components/MotivationCarousel.vue';

export default {
  components: {
    NavigationFlex,
    HerroCounter,
    SendNotification,
    MotivationCarousel
  },
}
</script>
