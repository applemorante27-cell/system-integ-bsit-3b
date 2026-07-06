import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  build: {
    transpile: ['vuetify'],
  },

  vite: {
    plugins: [
      vuetify({ autoImport: true }),
    ],
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  runtimeConfig: {
    public: {
      //@ts-ignore
      googleClientId: process.env.NUXT_PUBLIC_GOOGLE_CLIENT_ID,

      // ✅ IDAGDAG MO LANG ITO
      //@ts-ignore
      weatherApiKey: process.env.NUXT_PUBLIC_WEATHER_API_KEY || ''
    }
  }
})