<script lang="ts">
  export let suggestions: { [key: string]: boolean }
</script>

{#each Object.entries(suggestions) as [suggestion, display]}
  {#if !!display}
    <slot {suggestion} />
  {/if}
{/each}
