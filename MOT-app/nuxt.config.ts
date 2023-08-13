export default defineNuxtConfig({
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/pwa',
  ],
  pwa: {
    meta: {
      title: 'My PWA',
      author: 'Me',
    },
    manifest: {
      name: 'Nuxt.js PWAs are so easy',
      short_name: 'Nuxt.js PWA',
      lang: 'en',
    },
    icon: {
      source: '~/static/icon.ico',
    },
  },
});
