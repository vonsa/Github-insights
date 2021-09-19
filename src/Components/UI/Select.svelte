<script lang="ts">
  export let items: string[]
  export let selected: string
</script>

<!-- svelte-ignore a11y-no-onchange -->
<select on:change bind:value={selected}>
  {#if items.length > 0}
    {#each items as item}
      <option value={item.toLowerCase()}>{item}</option>
    {/each}
  {:else}
    <option disabled selected>No profiles available</option>
  {/if}
</select>

<style lang="scss">
  @import 'src/scss/_mixins.scss';

  select,
  select:focus,
  select:focus-visible {
    @include input;
    outline: none;
  }

  select {
    width: 100%;
  }
</style>
