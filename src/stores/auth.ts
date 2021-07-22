import { querystring } from 'svelte-spa-router'
import qs from 'qs'
import axios from 'axios'
import { BehaviorSubject, combineLatest, Subject } from 'rxjs'
import { filter, map, repeatWhen, takeUntil } from 'rxjs/operators'

const login$ = new Subject()
const querystring$ = new Subject<string | undefined>()

export const authenticated$ = new BehaviorSubject(!!localStorage.getItem('auth_token'))

export function login(redirectUrl: string = window.location.href) {
  login$.next(redirectUrl)
}

export function logout() {
  authenticated$.next(false)
  localStorage.removeItem('auth_token')
}

combineLatest([
  login$,
  querystring$.pipe(
    map((querystring) => {
      return querystring && qs.parse(querystring).code
    }),
  ),
])
  .pipe(
    takeUntil(authenticated$.pipe(filter((authenticated) => !!authenticated))),
    repeatWhen(() => authenticated$.pipe(filter((authenticated) => !authenticated))),
  )
  .subscribe(([redirectUrl, code]) => {
    if (code) {
      axios
        .get(`http://localhost:9999/authenticate/${code}`)
        .then((response) => {
          localStorage.setItem('auth_token', response.data.token)
          authenticated$.next(true)
        })
        .catch(() => {
          localStorage.removeItem('auth_token')
        })
    } else {
      window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&type=user_agent&redirect_url=${redirectUrl}`
    }
  })

querystring.subscribe((querystring) => {
  querystring$.next(querystring)
})
