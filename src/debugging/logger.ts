export function log(message: any) {
  if (!process.env.isProd) {
    /* eslint-disable no-console */
    console.warn(message)
    /* eslint-enable  no-console */
  }
}
