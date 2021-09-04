<script lang="ts" context="module">
  interface NavbarItem {
    label: string
    location: string
  }
</script>

<script lang="ts">
  import Nav from './Nav.svelte'

  export let items: NavbarItem[]
</script>

{#each items as { label, location }}
  <Nav {label} {location} />
{/each}
