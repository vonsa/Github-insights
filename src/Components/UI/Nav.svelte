<script lang="ts">
  import { link } from 'svelte-spa-router'

  export let label: string
  export let location: string | undefined = undefined
  export let action: () => void = () => {}
</script>

{#if location}
  <a href={location} use:link on:click class="link">{label}</a>
{:else if action}
  <button on:click on:click={action} class="link">{label}</button>
{/if}

<style lang="scss">
</style>
