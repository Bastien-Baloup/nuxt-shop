import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    strict: true,
    typeCheck: true,
  },
  nitro: {
    plugins: [
      "~/server/lib/connectDb.ts",
    ]
  },
  runtimeConfig: {
    jwtSecret: '', // can be overridden by NUXT_JWT_SECRET environment variable
  },
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  }
})
