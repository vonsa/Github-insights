<script lang="ts">
  import { login } from 'src/services/authService'
  import { getBaseUrl } from 'src/util/url'
  import MaskedIcon from '../Decoration/MaskedIcon.svelte'

  export let redirectUrl = getBaseUrl()
</script>

<button on:click={() => login(redirectUrl)} on:click
  ><div class="icon">
    <MaskedIcon icon="github" size="small" styles={{ 'background-color': '#fff' }} />
  </div>
  Authenticate using Github</button
>

<style lang="scss">
  button {
    display: flex;
    align-items: center;
    background: #000;
  }

  .icon {
    margin-right: 0.64rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
