import qs from 'qs'
import { BehaviorSubject, Observable } from 'rxjs'
import { filter, map, shareReplay } from 'rxjs/operators'
import { querystring } from 'svelte-spa-router'
import { getUrlWithoutParam } from 'src/util/url'

export const querystring$ = new BehaviorSubject<string | undefined>(window.location.search)

const params$ = querystring$.pipe(
  map((querystring: string | undefined) => {
    return querystring && qs.parse(querystring)
  }),
  shareReplay(1),
)

function watchParam(
  param: string,
  filterNullish = false,
): { param$: Observable<any>; remove: () => void } {
  const param$ = params$.pipe(map((params) => (params && params[param]) || null))

  const filteredParam$ = filterNullish ? param$.pipe(filter((param) => !!param)) : param$

  return { param$: filteredParam$, remove: () => removeParamFromUrl(param) }
}

function removeParamFromUrl(param: string) {
  window.location.href = getUrlWithoutParam(param)
}

function setParam(param: string, value: any) {
  const querystring = window.location.hash.split('?')[1]
  let params

  if (querystring) {
    params = qs.parse(querystring)
    params[param] = value
  } else {
    params = { [param]: value }
  }

  window.location.href = `${window.location.hash.split('?')[0]}?${qs.stringify(params)}`
}

querystring.subscribe((querystring) => {
  querystring$.next(querystring)
})

export { watchParam, setParam }
