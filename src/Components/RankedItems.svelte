<script context="module" lang="ts">
  import type { Icon } from 'src/assets/icons'
  interface RankedItem {
    label: string
    count: number
  }

  export type RankedItemsProp = [RankedItem, RankedItem, RankedItem]

  interface FormattedRankedItem extends RankedItem {
    icon: Icon
  }
</script>

<script lang="ts">
  import Showcase from './Showcase.svelte'

  export let items: RankedItemsProp

  function getFormattedItems(): FormattedRankedItem[] {
    return items.map((item, index) => ({ ...item, icon: getIcon((index + 1) as 1 | 2 | 3) }))
  }

  function getIcon(number: 1 | 2 | 3): Icon {
    return `rank-${number}`
  }
</script>

<Showcase cards={getFormattedItems()} />
