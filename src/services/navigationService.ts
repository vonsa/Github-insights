import { push as pushTo, replace } from 'svelte-spa-router'
import { wrap } from 'svelte-spa-router/wrap'
import { map, Observable } from 'rxjs'
import { login, logout, token$ } from 'src/services/authService'
import { log } from 'src/debugging/logger'
import type { NavbarItem } from 'src/Components/UI/types/Navbar'
import Home from '../Routes/Home.svelte'
import Profile from '../Routes/Profile.svelte'
import NotFound from '../Routes/NotFound.svelte'
import NotAllowed from '../Routes/NotAllowed.svelte'

const routes = {
  '/': Home,
  '/profiles': wrap({
    component: Profile,
    conditions: [() => !!token$],
  }),
  '/not-allowed': NotAllowed,
  '*': NotFound,
}

const navItems$: Observable<NavbarItem[]> = token$.pipe(map((token) => getNavItems(!!token)))

function getNavItems(loggedIn: boolean) {
  return [
    { label: 'Home', location: '/', mobileIcon: 'home' as const },
    ...(loggedIn
      ? [{ label: 'Profiles', location: '/profiles', mobileIcon: 'profiles' as const }]
      : []),
    loggedIn
      ? { label: 'Logout', action: logout, mobileIcon: 'logout' as const }
      : { label: 'Login', action: login, mobileIcon: 'login' as const },
  ]
}

function push(location: keyof typeof routes) {
  return pushTo(location)
}

function conditionsFailed() {
  log('conditionsFailed event, redirecting to /not-allowed')

  replace('/not-allowed')
}

export { navItems$, routes, conditionsFailed, push }
