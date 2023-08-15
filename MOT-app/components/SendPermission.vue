<template>
    <div>
      <button v-if="showButton" @click="requestPermission">
        Enable Push Notifications
      </button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showButton: false
      };
    },
    mounted() {
      // Check if Notification API and Service Worker are supported and if permission is not already granted
      if ('Notification' in window && 'serviceWorker' in navigator && Notification.permission !== 'granted') {
        this.showButton = true;
      }
    },
    methods: {
      async requestPermission() {
        try {
          const permission = await Notification.requestPermission();
  
          if (permission === 'granted') {
            this.showButton = false;
            // You can also subscribe the user to push notifications here if desired
            this.subscribeUserToPush();
          }
        } catch (error) {
          console.error("Error requesting notification permission:", error);
        }
      },
      subscribeUserToPush() {
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.ready.then(registration => {
            registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: this.urlBase64ToUint8Array('BDVegVtNx38z96_BoMa3WeQJHD-4WrqXDe3vtcEYI3Bo7t9E5JV7opeqE68ruAwgEsoRfFcMvJYjm2kSNwTSLfg')
            }).then(subscription => {
              // Send subscription to your server or save it in your DB (e.g., Fauna)
              console.log("User subscribed:", subscription);
            }).catch(error => {
              console.error('Failed to subscribe the user: ', error);
            });
          });
        }
      },
      urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
          .replace(/\-/g, '+')
          .replace(/_/g, '/');
  
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
  
        for (let i = 0; i < rawData.length; ++i) {
          outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  button {
    padding: 10px 15px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  