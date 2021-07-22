<script context="module" lang="ts">
  interface RankedItem {
    label: string
    count: number
  }
</script>

<script lang="ts">
  import Showcase from './Showcase.svelte'

  export let items: [RankedItem, RankedItem, RankedItem]
</script>

<Showcase cards={items.map((item, index) => ({ ...item, icon: `rank-${index + 1}` }))} />
