<script lang="ts">
  export let list: { [key: string]: boolean }
</script>

{#each Object.entries(list) as [item, display]}
  {#if !!display}
    <slot {item} />
  {/if}
{/each}
