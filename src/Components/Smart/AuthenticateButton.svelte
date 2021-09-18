<script lang="ts">
  import { login } from 'src/services/authService'
  import { getBaseUrl } from 'src/util/url'
  import MaskedIcon from '../Decoration/MaskedIcon.svelte'

  export let redirectUrl = getBaseUrl()
  export let label = 'Authenticate using Github'
</script>

<button on:click={() => login(redirectUrl)} on:click
  ><div class="icon">
    <MaskedIcon icon="github" size="small" styles={{ 'background-color': '#fff' }} />
  </div>
  {label}</button
>

<style lang="scss">
  @import 'src/scss/_variables.scss';
  @import 'src/scss/_mixins.scss';
  button {
    @include button;
    display: flex;
    align-items: center;
    background: $color-black;
    color: $color-white;
  }

  .icon {
    margin-right: 0.64rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
