<template>
    <button @click="scheduleNotification">Test Schedule Notification</button>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // Days you want the notification to be sent (0 = Sunday, 1 = Monday, etc.)
        days: [0, 1, 2, 3, 4, 5], // Monday, Tuesday, Friday
        time: { hours: 23, minutes: 17 } // 3:30 PM
      };
    },
    methods: {
      async scheduleNotification() {
        // Check for notification support
        if (!("Notification" in window)) {
          alert("This browser does not support desktop notifications.");
          return;
        }
  
        // Request permission if not already granted
        if (Notification.permission !== "granted") {
          const permission = await Notification.requestPermission();
  
          // If permission is denied, exit the function
          if (permission !== "granted") {
            return;
          }
        }
  
        // Calculate the next notification time
        const now = new Date();
        let nextNotificationTime = new Date(now);
        nextNotificationTime.setHours(this.time.hours, this.time.minutes, 0, 0);
  
        // If the desired time for today has already passed, move to the next day
        if (now > nextNotificationTime) {
          nextNotificationTime.setDate(nextNotificationTime.getDate() + 1);
        }
  
        // Find the next day from the specified days
        while (this.days.indexOf(nextNotificationTime.getDay()) === -1) {
          nextNotificationTime.setDate(nextNotificationTime.getDate() + 1);
        }
  
        // Calculate the difference between now and the next notification time
        const timeoutDuration = nextNotificationTime - now;
  
        // Schedule the notification
        setTimeout(() => {
          new Notification("Scheduled Notification", {
            body: "This is your scheduled notification.",
            icon: "path_to_icon.png" // Optional icon
          });
        }, timeoutDuration);
      }
    }
  };
  </script>
  