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

<AutoRedirect>
  <Apollo>
    <Router {routes} />
  </Apollo>
  <h1>Test</h1>
</AutoRedirect>
