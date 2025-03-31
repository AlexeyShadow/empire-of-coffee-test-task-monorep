export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/fonts", "@vueuse/nuxt", "@pinia/nuxt", "@nuxt/ui"],
  fonts: {
    families: [
      {
        name: "Roboto",
        provider: "google",
        weights: [400, 700],
      },
    ],
  },
  runtimeConfig: {
    public: {
      backendBaseUrl: process.env.BACKEND_BASE_URL || "http://localhost:3001",
    },
  },
  css: ["./assets/scss/global.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/assets/scss/variables";
            @import "@/assets/scss/mixins";
          `,
        },
      },
    },
  },
});
