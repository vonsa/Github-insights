export function getBaseUrl(): string {
  const getUrl = window.location
  const baseUrl = `${getUrl.protocol}//${getUrl.host}/${getUrl.pathname.split('/')[1]}`

  return baseUrl
}
