declare module '*.svg' {
  export default Svelte2TsxComponent
}

interface ImportMetaEnv {
  VITE_CLIENT_ID: string
  VITE_GATEKEEPER_URL: string
  VITE_APOLLO_KEY: string
  VITE_GTM_CONTAINER_ID: string
  VITE_VERSION: string
}
