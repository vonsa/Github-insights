<script lang="ts">
  export let items: string[]
  //   export let cta: string | undefined = undefined
</script>

<!-- svelte-ignore a11y-no-onchange -->
<select on:change>
  {#each items as item}
    <option>{item}</option>
  {/each}
  <!-- {#if cta}
    <option>{cta}</option>
  {/if} -->
</select>

<style lang="scss">
</style>
