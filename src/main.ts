import * as Sentry from '@sentry/browser'
import { BrowserTracing } from '@sentry/tracing'
import './scss/_main.scss'
import App from './App.svelte'
import { APP_CONFIG } from './config'

if (APP_CONFIG.PROD) {
  Sentry.init({
    dsn: 'https://b44ac9c46e694338b7f288e113d1794d@o1293544.ingest.sentry.io/6516159',
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
    environment: 'production',
    release: `github-insights@${APP_CONFIG.VITE_VERSION}`,
  })
}

const app = new App({
  target: document.body,
})

export default app
