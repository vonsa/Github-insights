<script context="module" lang="ts">
  import type { ShowcaseCard } from './ShowcaseCard.svelte'

  export type ShowcaseCards = ShowcaseCard[]
</script>

<script lang="ts">
  import ShowcaseCardComponent from './ShowcaseCard.svelte'

  export let cards: ShowcaseCards
</script>

{#each cards as card}
  <ShowcaseCardComponent {...card} />
{/each}
