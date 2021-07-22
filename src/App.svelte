<script lang="ts">
  import Home from './Routes/Home.svelte'
  import Router from 'svelte-spa-router'
  import Apollo from './Components/Hoc/Apollo.svelte'
  import AutoRedirect from './Components/Hoc/AutoRedirect.svelte'
  import './stores/auth'

  const routes = {
    '/': Home,
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
    <Router {routes} restoreScrollState={true} />
  </Apollo>
  <h1>Test</h1>
</AutoRedirect>
