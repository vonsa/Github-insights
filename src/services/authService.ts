import qs from 'qs'
import axios from 'axios'
import { BehaviorSubject, combineLatest, Subject } from 'rxjs'
import { filter, repeatWhen, takeUntil } from 'rxjs/operators'
import { getUrlWithoutParam } from 'src/util/url'
import { querystring$, watchParam } from 'src/stores/searchParams'
import { query } from 'src/GraphQL/apollo'
import type { Viewer } from 'src/GraphQL/types/Viewer'
import { QUERY_LOGGED_IN_USERNAME } from 'src/GraphQL/Queries/User/user-queries'

const tryLogin$ = new Subject()
const code$ = watchParam('code')
const token$ = new BehaviorSubject(localStorage.getItem('auth_token'))
const promptLogin$ = new Subject<boolean>()
const login$ = new BehaviorSubject<string | null>(localStorage.getItem('login'))

function login(redirectUrl: string = window.location.href) {
  tryLogin$.next(redirectUrl)
}

async function getLogin() {
  const response = await query<Viewer>({
    query: QUERY_LOGGED_IN_USERNAME,
    fetchPolicy: 'no-cache',
  })

  return response.data.viewer.login
}

function logout() {
  token$.next(null)
  login$.next(null)
}

code$.pipe(filter((code) => !!code)).subscribe((code) => {
  axios
    .get(`http://localhost:9999/authenticate/${code}`)
    .then((response) => {
      token$.next(response.data.token)

      getLogin().then((name) => {
        login$.next(name)
      })
    })
    .catch(() => {
      token$.next(null)
    })
})

combineLatest([token$, querystring$]).subscribe(([token, querystring]) => {
  const parsedQuerystring = querystring && qs.parse(querystring)
  if (token && parsedQuerystring && 'code' in parsedQuerystring) {
    window.location.href = getUrlWithoutParam('code')
  }
})

tryLogin$.subscribe((redirectUrl) => {
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&type=user_agent&redirect_url=${redirectUrl}`
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

login$.subscribe((login) => {
  if (login) {
    localStorage.setItem('login', login)
  } else {
    localStorage.removeItem('login')
  }
})

token$.subscribe((token) => {
  if (token) {
    localStorage.setItem('auth_token', token)
  } else {
    localStorage.removeItem('auth_token')
  }
})

export { token$, login$, promptLogin$, login, logout }
