import { copyFileSync } from 'fs'
import topLevelAwait from 'vite-plugin-top-level-await'
import wasm from 'vite-plugin-wasm'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // https://nuxt.com/modules
  modules: [
    '@nuxthub/core',
    '@nuxt/eslint',
  ],

  // https://devtools.nuxt.com
  devtools: { enabled: true },

  // Env variables - https://nuxt.com/docs/getting-started/configuration#environment-variables-and-private-tokens
  runtimeConfig: {
    public: {
      // Can be overridden by NUXT_PUBLIC_HELLO_TEXT environment variable
      helloText: 'Hello from the Edge 👋',
    },
  },
  // https://nuxt.com/docs/getting-started/upgrade#testing-nuxt-4
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2024-07-30',

  nitro: {
    experimental: { wasm: true },
    // wasm: { lazy: true },
  },

  // https://hub.nuxt.com/docs/getting-started/installation#options
  hub: {},

  vite: {
    plugins: [
      wasm(),
      topLevelAwait(),
    ],
    worker: {
      plugins: () => [
        wasm(),
        topLevelAwait(),
      ],
    },

    optimizeDeps: {
      exclude: ['@nimiq/core'],
    },
  },

  hooks: {
    'build:before': () => {
      // Copy server WASM file into codebase to use with @rollup/plugin-wasm
      // Should not be necessary, but for unknown reasons I am getting an `Unknown file extension ".wasm"` error
      // when importing from node_modules directly.
      copyFileSync('node_modules/@nimiq/core/web/main-wasm/index_bg.wasm', './server/api/nimiq.wasm')
      console.log('✔ Copied server WASM to codebase')
    },
  },

  // https://eslint.nuxt.com
  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
      },
    },
  },
})
