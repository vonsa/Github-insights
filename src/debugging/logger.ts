export function log(message: any) {
  if (!import.meta.env.PROD) {
    /* eslint-disable no-console */
    console.warn(message)
    /* eslint-enable  no-console */
  }
}
