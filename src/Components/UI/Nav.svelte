<script lang="ts">
  import { link } from 'svelte-spa-router'

  export let label: string
  export let location: string | undefined = undefined
  export let action: () => void = () => {}
  export let active: boolean
</script>

{#if location}
  <a href={location} use:link on:click class="link" class:active>{label}</a>
{:else if action}
  <button on:click on:click={action} class="link" class:active>{label}</button>
{/if}

<style lang="scss">
  @import 'src/scss/_variables.scss';

  .active {
    color: $color-lightblue;
  }
</style>
