<script context="module" lang="ts">
  import type { Icon } from 'src/assets/icons'

  interface RankedItem {
    label: string
    count: number
  }

  export type RankedItemsProp = [RankedItem, RankedItem, RankedItem]

  interface FormattedRankedItem extends RankedItem {
    icon: Icon
    backgroundColor: string
  }
</script>

<script lang="ts">
  import Showcase from './Showcase.svelte'

  export let items: RankedItemsProp

  $: formattedItems = getFormattedItems(items)

  function getFormattedItems(items: RankedItemsProp): FormattedRankedItem[] {
    return items.map((item, index) => ({ ...item, ...getRankedProps((index + 1) as 1 | 2 | 3) }))
  }

  function getRankedProps(number: 1 | 2 | 3): { icon: Icon; backgroundColor: string } {
    let backgroundColor: string

    switch (number) {
      case 1:
        backgroundColor = '#ffeaa6'
        break
      case 2:
        backgroundColor = '#f5f5f5'
        break
      case 3:
        backgroundColor = '#f5e2da'
        break
    }

    return { icon: `rank-${number}`, backgroundColor }
  }
</script>

<Showcase cards={formattedItems} />
