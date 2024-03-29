// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ["@nuxtjs/tailwindcss"],
    app: {
        baseURL: "/health-plan-comparison/", // baseURL: '/<repository>/'
        buildAssetsDir: "assets", // don't use "_" at the begining of the folder name to avoids n
    },
});
