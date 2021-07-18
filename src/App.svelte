<script lang="ts">
  import Home from './Routes/Home.svelte'
  import Router from 'svelte-spa-router'
  import LoginResponse from './Routes/LoginResponse.svelte'
  import Apollo from './Components/Hoc/Apollo.svelte'
  import AutoRedirect from './Components/Hoc/AutoRedirect.svelte'

  const routes = {
    '/': Home,
    '/login-response': LoginResponse,
  }
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

<AutoRedirect>
  <Apollo>
    <Router {routes} />
  </Apollo>
  <h1>Test</h1>
</AutoRedirect>
