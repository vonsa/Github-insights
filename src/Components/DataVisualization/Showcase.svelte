<script context="module" lang="ts">
  import type { ShowcaseCard } from './ShowcaseCard.svelte'

  export type ShowcaseCards = ShowcaseCard[]
</script>

<script lang="ts">
  import ShowcaseCardComponent from './ShowcaseCard.svelte'

  export let cards: ShowcaseCards
</script>

<div class="cards">
  {#each cards as card}
    <div class="card">
      <ShowcaseCardComponent {...card} />
    </div>
  {/each}
</div>

<style lang="scss">
  .cards {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
  }
</style>
