// In cloudflare, you cannot use wasm from node_modules for security reasons. We would need to copy in a hook in nuxt.config

// 1. Approach as seen in https://stackblitz.com/edit/stackblitz-starters-4rizt7

// Make sure to have  `wasm: { lazy: true, esmImport: true }` in nitro config in nuxt.config.ts

// import init, { PublicKey } from '@nimiq/core/web'

// export default defineEventHandler(async () => {
//   const mod = await import('@nimiq/core/web/main-wasm/index_bg.wasm?module' as string).then(m => m.default)
//   await init(mod)
//   const publicKey = '82d80b86d9bf1906832e9f0ba4fa69018792f59190075c396b0e85aeac444e55'
//   const key = PublicKey.fromHex(publicKey)
//   return key.toHex()
// })
// --> [nuxt] [request error] [unhandled] [500],WebAssembly.instantiate(): Import #0 "wbg": module is not an object or function

// ------------------

// Approach as seen in https://github.com/nimiq/core-rs-albatross/issues/3277#issuecomment-2646614887

import init, { PublicKey } from '@nimiq/core/web'
import mod from './nimiq.wasm'

export default defineEventHandler(async () => {
  await init(mod)
  const publicKey = '82d80b86d9bf1906832e9f0ba4fa69018792f59190075c396b0e85aeac444e55'
  const key = PublicKey.fromHex(publicKey)
  return new Response(key.toHex())
})
//    GET 500 /
//   (warn)
// using deprecated parameters for the initialization function; pass a single object instead
// [wasm] [error],TypeError: WebAssembly.instantiate(): Import #0 "wbg": module is not an object or function
// Error: The script will never generate a response.
// https://github.com/rustwasm/wasm-bindgen

// --------------

// export default defineEventHandler(async () => {
//   if (import.meta.prod) {
//     console.log('prod')
//     const mod = await import('./nimiq.wasm?module' as string).then(m => m.default)
//     const { default: init } = await import('@nimiq/core/web')
//     await init(mod)
//   }
//   const { PublicKey } = await import('@nimiq/core/web')
//   const publicKey = '82d80b86d9bf1906832e9f0ba4fa69018792f59190075c396b0e85aeac444e55'
//   const key = PublicKey.fromHex(publicKey)
//   return key.toHex()
// })
// --> [nuxt] [request error] [unhandled] [500],Cannot read properties of undefined (reading '__wbindgen_malloc')
