<script context="module" lang="ts">
  import type { ShowcaseCard } from './ShowcaseCard.svelte'

  export type ShowcaseCards = ShowcaseCard[]
</script>

<script lang="ts">
  export let cards: ShowcaseCards
</script>

<!-- dummy setup for now -->
{#each cards as card}
  <h1>{card}</h1>
{/each}
