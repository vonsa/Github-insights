<script lang="ts">
  import Router from 'svelte-spa-router'
  import Apollo from './Components/Hoc/Apollo.svelte'
  import AutoRedirect from './Components/Hoc/AutoRedirect.svelte'
  import '@/services/authService'
  import { conditionsFailed, navItems$, routes } from '@/services/navigationService'
  import Modal from './Components/UI/Modal.svelte'
  import AuthenticateButton from './Components/Smart/AuthenticateButton.svelte'
  import { promptLogin$ } from './services/authService'
  import Notifications from './Components/UI/Notifications.svelte'
  import Navbar from './Components/UI/Navbar.svelte'
  import Authentication from './Components/Hoc/Authentication.svelte'
  import Analytics from './Components/Smart/Analytics.svelte'
  import { APP_CONFIG } from './config'
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

{#if APP_CONFIG.PROD}
  <Analytics />
{/if}
<AutoRedirect>
  <Apollo>
    <Navbar items={$navItems$} logo="/assets/images/logo.svg">
      <h2 slot="logo" class="logo">GITHUB INSIGHTS</h2>
    </Navbar>
    <Router {routes} restoreScrollState={true} on:conditionsFailed={conditionsFailed} />
  </Apollo>
</AutoRedirect>
{#if $promptLogin$}
  <Modal
    on:close={() => {
      promptLogin$.next(false)
    }}
  >
    <h3>You seem to be logged out, please authorize yourself using Github.</h3>
    <AuthenticateButton />
  </Modal>
{/if}

<Authentication />
<Notifications />

<style lang="scss">
  @import 'src/scss/_variables.scss';
  .logo {
    color: $color-white;
  }
</style>
