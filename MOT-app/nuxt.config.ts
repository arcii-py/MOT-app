export default defineNuxtConfig({
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@vite-pwa/nuxt',
  ],
  pwa: {
    manifest: {
      name: "Nuxt 3 PWA",
      short_name: "Testing",
      description: "test",
      icons: [
        {
          src: 'static/ico.png',
          sizes: '64x64',
          type: 'image/png'
        }
      ]
    }
  }
});
