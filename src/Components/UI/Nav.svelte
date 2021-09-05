<script lang="ts">
  import { link } from 'svelte-spa-router'

  export let label: string
  export let location: string
</script>

<a href={location} use:link on:click>{label}</a>
