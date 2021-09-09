<script lang="ts">
  import { link } from 'svelte-spa-router'

  export let label: string
  export let location: string | undefined = undefined
  export let action: () => void = () => {}
</script>

{#if location}
  <a href={location} use:link on:click>{label}</a>
{:else if action}
  <button on:click={action} on:click>{label}</button>
{/if}
