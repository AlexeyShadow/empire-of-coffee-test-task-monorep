// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/fonts", "@vueuse/nuxt", "@pinia/nuxt", '@nuxt/ui'],
  fonts: {
    families: [
      {
        name: "Roboto",
        provider: "google",
        weights: [400, 700],
      },
    ],
  },
  css: ["./assets/scss/global.scss"],
});
