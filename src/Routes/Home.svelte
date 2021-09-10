<script lang="ts">
  import { login, token$ } from 'src/services/authService'
  import Route from '../Components/Hoc/Route.svelte'
  import Button from '../Components/ProjectSpecific/Button.svelte'
  import { getBaseUrl } from 'src/util/url'
  import { push } from 'src/services/navigationService'
</script>

<Route>
  <div class="container">
    <div class="intro">
      <h1>Check your Github stats!</h1>
      <p>
        It's easy, just authorize yourself using your Github account and view your profile stats.
        You can also search for other profiles.
      </p>
    </div>
    {#if !$token$}
      <Button
        icon="github"
        label="Authenticate using Github"
        on:click={() => login(getBaseUrl())}
      />
    {:else}
      <div class="buttons">
        <Button label="View your profile" on:click={() => push('/profiles')} />
      </div>
    {/if}
  </div>
</Route>

<style lang="scss">
  @import 'src/scss/_variables.scss';

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    flex: 1;
  }

  .intro {
    margin-bottom: $margin-small;
  }
  .buttons {
    display: flex;
  }
</style>
