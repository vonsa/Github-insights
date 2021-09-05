<script lang="ts">
  import Home from './Routes/Home.svelte'
  import Router from 'svelte-spa-router'
  // import { wrap } from 'svelte-spa-router/wrap'
  import Apollo from './Components/Hoc/Apollo.svelte'
  import AutoRedirect from './Components/Hoc/AutoRedirect.svelte'
  import 'src/services/authService'
  import Modal from './Components/UI/Modal.svelte'
  import AuthenticateButton from './Components/ProjectSpecific/AuthenticateButton.svelte'
  import { promptLogin$, token$ } from 'src/services/authService'
  import Notifications from './Components/UI/Notifications.svelte'
  import Login from './Components/Login.svelte'
  import Navbar from './Components/UI/Navbar.svelte'
  import type { NavbarItem } from './Components/UI/Navbar.svelte'
  import Logout from './Routes/Logout.svelte'

  const routes = {
    '/': Home,
    '/login': Login,
    '/logout': Logout,
    // '/logged-in': wrap({
    //   component: Home,
    //   conditions: [() => !!$token$],
    // }),
    // '*': NotFound,
  }

  let navItems: NavbarItem[]

  // const navItems: NavbarItem[] = [
  //   { label: 'Home', location: '/' },
  //   { label: 'Login', location: '/login' },
  // ]

  $: navItems = [
    { label: 'Home', location: '/' },
    $token$ ? { label: 'Logout', location: '/logout' } : { label: 'Login', location: '/login' },
  ]

  // type Route = keyof typeof routes
</script>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<!-- <MouseFollower /> -->
<AutoRedirect>
  <Apollo>
    <Navbar items={navItems} logo="/assets/images/logo.svg" />
    <Router {routes} restoreScrollState={true} />
  </Apollo>
</AutoRedirect>
{#if $promptLogin$}
  <Modal
    on:close={() => {
      promptLogin$.next(false)
    }}
  >
    <h3>You seem to be logged out, please authorize yourself using Github</h3>
    <AuthenticateButton />
  </Modal>
{/if}

<Notifications />
