<script lang="ts">
  export let items: string[]
  export let selected: string
  //   export let cta: string | undefined = undefined

  $: console.log({ selected })
</script>

<!-- svelte-ignore a11y-no-onchange -->
<select on:change bind:value={selected}>
  {#if items.length > 0}
    {#each items as item}
      {console.log('rerendering item', item)}
      <option value={item.toLowerCase()}>{item}</option>
    {/each}
  {:else}
    <option disabled selected>No profiles available</option>
  {/if}

  <!-- {#if cta}
    <option>{cta}</option>
  {/if} -->
</select>

<style lang="scss">
  @import 'src/scss/_mixins.scss';

  select,
  select:focus,
  select:focus-visible {
    @include input;
    outline: none;
  }
</style>
