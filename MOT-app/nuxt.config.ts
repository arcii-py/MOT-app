import dotenv from 'dotenv';

dotenv.config();

export default {
  modules: [
    '@nuxtjs/tailwindcss',
    '@vite-pwa/nuxt',
  ],
  pwa: {
    swURL: '/sw.js', // Path to our service worker
    manifest: {
      name: "Nuxt 3 PWA",
      lang: 'en',
      short_name: "Testing",
      description: "test",
      icons: [
        {
          src: 'icons/icon_64x64.png',
          sizes: '64x64',
          type: 'image/png'
        },
        {
          src: 'icons/icon_144x144.png',
          sizes: '144x144',
          type: 'image/png'
        },
        {
          src: 'icons/icon_192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'icons/icon_512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
  },

  env: {
    VAPID_PUBLIC_KEY: process.env.VAPID_PUBLIC_KEY
  },

  publicRuntimeConfig: {
    VAPID_PUBLIC_KEY: process.env.VAPID_PUBLIC_KEY
  }
};
