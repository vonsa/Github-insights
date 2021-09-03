<script lang="ts">
  import Home from './Routes/Home.svelte'
  import Router from 'svelte-spa-router'
  // import { wrap } from 'svelte-spa-router/wrap'
  import Apollo from './Components/Hoc/Apollo.svelte'
  import AutoRedirect from './Components/Hoc/AutoRedirect.svelte'
  import 'src/services/authService'
  import Modal from './Components/UI/Modal.svelte'
  import AuthenticateButton from './Components/ProjectSpecific/AuthenticateButton.svelte'
  import { promptLogin$ } from 'src/services/authService'
  // import MouseFollower from './Components/UI/MouseFollower.svelte'

  const routes = {
    '/': Home,
    // '/logged-in': wrap({
    //   component: Home,
    //   conditions: [() => !!$token$],
    // }),
    // '*': NotFound,
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

<!-- <MouseFollower /> -->
<AutoRedirect>
  <Apollo>
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
