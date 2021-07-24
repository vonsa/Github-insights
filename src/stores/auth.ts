import qs from 'qs'
import axios from 'axios'
import { BehaviorSubject, combineLatest, Subject } from 'rxjs'
import { filter, repeatWhen, takeUntil } from 'rxjs/operators'
import { getUrlWithoutParam } from 'src/util/url'
import { querystring$, watchParam } from './searchParams'

const tryLogin$ = new Subject()
const code$ = watchParam('code')
const token$ = new BehaviorSubject(localStorage.getItem('auth_token'))

function login(redirectUrl: string = window.location.href) {
  tryLogin$.next(redirectUrl)
}

function logout() {
  token$.next(null)
  localStorage.removeItem('auth_token')
}

code$.pipe(filter((code) => !!code)).subscribe((code) => {
  axios
    .get(`http://localhost:9999/authenticate/${code}`)
    .then((response) => {
      localStorage.setItem('auth_token', response.data.token)
      token$.next(response.data.token)
    })
    .catch(() => {
      localStorage.removeItem('auth_token')
    })
})

combineLatest([token$, querystring$]).subscribe(([token, querystring]) => {
  const parsedQuerystring = querystring && qs.parse(querystring)
  if (token && parsedQuerystring && 'code' in parsedQuerystring) {
    window.location.href = getUrlWithoutParam('code')
  }
})

combineLatest([tryLogin$, code$])
  .pipe(
    takeUntil(token$.pipe(filter((token) => !!token))),
    repeatWhen(() => token$.pipe(filter((token) => !token))),
  )
  .subscribe(([redirectUrl, code]) => {
    if (!code) {
      window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&type=user_agent&redirect_url=${redirectUrl}`
    }
  })

export { token$, login, logout }
