<script lang="ts">
  import Tabs from '../Components/UI/Tabs.svelte'
  import { token$ } from 'src/services/authService'
  import AuthenticateButton from '../Components/ProjectSpecific/AuthenticateButton.svelte'
  import MaskedIcon from '../Components/Decoration/MaskedIcon.svelte'
  import Profile from '../Components/Composed/Profile.svelte'
</script>

<Tabs tabs={['Login', 'Profiles']} let:activeTab let:next>
  {#if activeTab === 0}
    {#if !$token$}
      <h3>The first step is to authenticate using Github</h3>
      <AuthenticateButton />
      <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);">
        <MaskedIcon
          icon="bottle"
          styles={{
            width: { default: '2rem', hover: '80rem' },
            height: { default: '2rem', hover: '80rem' },
            'background-color': { default: 'black', hover: 'red' },
            transition: { default: 'all 0.4s ease-in-out' },
          }}
        />
      </div>
    {:else}
      <h1>Nice, you're logged in!</h1>
      <div class="buttons">
        <button class="continue-button" on:click={next}>Continue</button>
        <AuthenticateButton label="Log in with a different account" />
      </div>
      <p>
        To log in with a different account, make sure you're not logged in to Github with your
        current account.
      </p>
    {/if}
  {/if}
  {#if activeTab === 1}
    <Profile />
  {/if}
</Tabs>

<style lang="scss">
  @import 'src/scss/_variables.scss';
  .buttons {
    display: flex;

    & > :not(:last-child) {
      margin-right: $margin-small;
    }
  }
</style>
