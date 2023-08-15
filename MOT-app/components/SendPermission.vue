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
            this.subscribeUserToPush();
          }
        } catch (error) {
          console.error("Error requesting notification permission:", error);
        }
      },
      async subscribeUserToPush() {
        if ('serviceWorker' in navigator) {
          try {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: this.urlBase64ToUint8Array(process.env.VAPID_PUBLIC_KEY)
            });
  
            await this.sendSubscriptionToServer(subscription);
          } catch (error) {
            console.error('Failed to subscribe the user: ', error);
          }
        }
      },
      async sendSubscriptionToServer(subscription) {
        try {
          const response = await fetch("/.netlify/functions/save-subscription", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(subscription),
          });
  
          if (!response.ok) {
            throw new Error('Failed to save subscription on the server');
          }
  
          console.log("User subscribed:", subscription);
        } catch (error) {
          console.error('Failed to save subscription on the server: ', error);
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
  