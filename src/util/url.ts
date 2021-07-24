import qs from 'qs'

export function getBaseUrl(): string {
  const getUrl = window.location
  const baseUrl = `${getUrl.protocol}//${getUrl.host}/${getUrl.pathname.split('/')[1]}`

  return baseUrl
}

export function getUrlWithoutParam(param: string): string {
  const { search } = window.location
  const parsedQuerystring = search && qs.parse(search)
  const hash = window.location.hash.split('?')[0]

  if (parsedQuerystring && parsedQuerystring[param]) {
    delete parsedQuerystring[param]
  }

  return `${getBaseUrl()}${hash}${qs.stringify(parsedQuerystring)}`
}

export function getUrlWithoutSearch() {
  const hash = window.location.hash.split('?')[0]

  return `${getBaseUrl()}${hash}`
}
