<script lang="ts">
  import { login, token$ } from 'src/services/authService'
  import Route from '../Components/Hoc/Route.svelte'
  import Button from '../Components/UI/Button.svelte'
  import { getBaseUrl } from 'src/util/url'
  import { push } from 'src/services/navigationService'
</script>

<Route>
  <div class="background" />
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
        type="light"
      />
    {:else}
      <div class="buttons">
        <Button
          label="View your profile"
          icon="profiles"
          on:click={() => push('/profiles')}
          type="light"
        />
      </div>
    {/if}
  </div>
</Route>

<style lang="scss">
  @import 'src/scss/_variables.scss';

  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    background-image: linear-gradient(
        180deg,
        rgba(32, 11, 51, 0.83) 0%,
        rgba(40, 16, 66, 0.83) 100%
      ),
      url('/assets/images/tech-background.jpg');
    background-size: cover;
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    flex: 1;
    color: $color-white;
  }

  .intro {
    margin-bottom: $margin-small;
  }
  .buttons {
    display: flex;
  }
</style>
