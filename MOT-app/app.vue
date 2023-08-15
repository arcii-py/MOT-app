<template>
  <VitePwaManifest/>
  <NavigationFlex />
  <HerroCounter />
  <MotivationCarousel />
  <SendNotification />
  <SendPermission />
</template>

<script>
import NavigationFlex from '~/components/NavigationFlex.vue';
import HerroCounter from '~/components/HerroCounter.vue';
import SendNotification from '~/components/SendNotification.vue';
import MotivationCarousel from '~/components/MotivationCarousel.vue';
import SendPermission from '~/components/SendPermission.vue';

export default {
  components: {
    NavigationFlex,
    HerroCounter,
    SendNotification,
    MotivationCarousel,
    SendPermission
  },
}
</script>
