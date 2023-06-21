export default defineNuxtConfig({
  app: { head: { title: "Polis" } },

  sourcemap: {
    server: true,
    client: true
  },

  imports: {
    dirs: [
      // Scan top-level modules
      "composables",
      // ... or scan modules nested one level deep with a specific name and file extension
      "composables/*/index.{ts,js,mjs,mts}",
      // ... or scan all modules within given directory
      "composables/**"
    ]
  },

  runtimeConfig: {
    apiPublicRouters: {
      "/api/v1/auth": ["post"],
      // "/api/v1/user/recovery": ["post"]
    },
    public: { publicPages: ["", "/"] },
  },

  modules:[
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt"
  ],

  components: [
    "components",
    "components/icons",
    "components/system"
  ]

});
