import { APP_CONFIG } from '@/config'

export function log(message: any) {
  if (!APP_CONFIG.PROD) {
    /* eslint-disable no-console */
    console.warn(message)
    /* eslint-enable  no-console */
  }
}
