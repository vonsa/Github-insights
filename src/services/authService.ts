import qs from 'qs'
import axios from 'axios'
import { BehaviorSubject, combineLatest, of, Subject, timer } from 'rxjs'
import {
  filter,
  repeatWhen,
  takeUntil,
  map,
  switchMap,
  startWith,
  take,
  mapTo,
} from 'rxjs/operators'
import { getUrlWithoutParam } from 'src/util/url'
import { querystring$, watchParam } from 'src/stores/searchParams'
import { query } from 'src/services/apolloService'
import type { Viewer } from 'src/GraphQL/types/Viewer'
import { QUERY_LOGGED_IN_USERNAME } from 'src/GraphQL/Queries/User/user-queries'
import { filterNullish } from 'src/util/filter'
import { notify } from './notificationService'

/*
  See web authentication flow:
  https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps#web-application-flow

  Url is automatically updated to:
    - Correct for missing hash in redirect
    - Remove code from query string
  */

const tryLogin$ = new Subject<string>()
const { param$: code$, remove: removeCodeParam } = watchParam('code')
const token$ = new BehaviorSubject(localStorage.getItem('auth_token'))
const promptLogin$ = new Subject<boolean>()
const login$ = new BehaviorSubject<string | null>(localStorage.getItem('login'))

const waiting$ = code$.pipe(
  switchMap((code) => {
    if (code) {
      return combineLatest([token$.pipe(filter((token) => !!token)), timer(1200)]).pipe(
        mapTo(false),
        startWith(true),
        take(2),
      )
    }

    return of(false)
  }),
)

const shouldLogin$ = combineLatest([code$, tryLogin$]).pipe(
  takeUntil(token$.pipe(filter((token) => !!token))),
  repeatWhen(() => token$.pipe(filter((token) => !token))),
  filter(([code]) => !code),
  map(([, redirectUrl]) => redirectUrl),
)

shouldLogin$.subscribe(toGithub)

code$.pipe(filterNullish()).subscribe(getTokenAndLoginDetails)

combineLatest([token$, querystring$]).subscribe(removeCodeFromQs)

login$.subscribe((login) => {
  updateStorage('login', login)
})

token$.subscribe((token) => {
  updateStorage('auth_token', token)
})

function updateStorage(key: string, value: string | null) {
  if (value) {
    localStorage.setItem(key, value)
  } else {
    localStorage.removeItem(key)
  }
}

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

function getTokenAndLoginDetails(code: string) {
  axios
    .get(`${process.env.GATEKEEPER_URL}${code}`)
    .then((response) => {
      if (response.data.error) {
        throw new Error('Could not authenticate')
      }
      token$.next(response.data.token)

      getLogin().then((name) => {
        login$.next(name)
      })
    })
    .catch(() => {
      notify({ title: 'Could not authenticate with Github, please try again.', type: 'ERROR' })
      token$.next(null)
      removeCodeParam()
    })
}

function removeCodeFromQs([token, querystring]: [string | null, string | undefined]) {
  const parsedQuerystring = querystring && qs.parse(querystring)
  if (token && parsedQuerystring && 'code' in parsedQuerystring) {
    window.location.href = getUrlWithoutParam('code')
  }
}

function toGithub(redirectUrl: string) {
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&type=user_agent&redirect_url=${redirectUrl}`
}

export { token$, login$, promptLogin$, waiting$, login, logout }
