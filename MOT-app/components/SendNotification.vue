<template>
  <div>
    <!-- Some UI here -->
  </div>
</template>

<script>
export default {
  name: 'SendNotification',
  data() {
    return {
      times: [
        { day: 'Monday', hour: 20, minute: 40 },
        { day: 'Friday', hour: 15, minute: 20 },
        // Add more times as required
      ]
    }
  },
  methods: {
    checkTime() {
      const now = new Date();
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const currentDay = dayNames[now.getDay()];
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      for (const time of this.times) {
        if (time.day === currentDay && time.hour === currentHour && time.minute === currentMinute) {
          this.sendNotification();
        }
      }
    },
    sendNotification() {
      if (!("Notification" in window)) {
        console.error("This browser does not support system notifications");
        return;
      }

      if (Notification.permission === "granted") {
        new Notification("Your Notification Title Here", {
          body: "Your notification content here.",
          // other options here, like icon etc.
        });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            new Notification("Your Notification Title Here", {
              body: "Your notification content here.",
              // other options here, like icon etc.
            });
          }
        });
      }
    }
  },
  mounted() {
    Notification.requestPermission();
    window.setInterval(this.checkTime, 60000); // Check every minute
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>
