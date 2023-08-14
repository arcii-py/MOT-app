<template>
  <div>
    <button @click="sendNotification">Test Notification</button><br/>
    <button @click="requestPermissions">Enable Notifications</button>
  </div>
</template>

<script>
export default {
  name: 'SendNotification',
  data() {
    return {
      times: [
        { day: 'Monday', hour: 13, minute: 30 },
        { day: 'Friday', hour: 15, minute: 20 },
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
        });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            new Notification("Your Notification Title Here", {
              body: "Your notification content here.",
            });
          }
        });
      }
    },
    async requestPermissions() {
      const permission = await Notification.requestPermission();

      if (permission !== 'granted') {
        throw new Error('Permission not granted for Notification');
      }

      const subscription = await navigator.serviceWorker.ready.then(reg => 
        reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: "YOUR_PUBLIC_VAPID_KEY"
        })
      );

      // Send subscription to application server
      console.log("Subscription:", subscription);
      const response = await fetch("/.netlify/functions/save-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subscription),
      });

      const data = await response.json();
      console.log(data.message);
    }
  },
  mounted() {
    Notification.requestPermission();
    window.setInterval(this.checkTime, 60000);
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>
