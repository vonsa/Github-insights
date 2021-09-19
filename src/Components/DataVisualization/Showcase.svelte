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
  @import 'src/scss/_variables.scss';
  @import 'src/scss/_mixins.scss';

  .cards {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;

    @include media-tiny {
      flex-direction: row;
      justify-content: center;
      align-items: stretch;
      flex-wrap: wrap;
    }

    @include media-small {
      justify-content: flex-start;
    }
  }

  .card {
    padding: 0;
    padding-bottom: $padding-small;
    width: 22rem;

    @include media-tiny {
      padding: 0 $padding-small $padding-small 0;
      width: 17rem;
    }
    @include media-medium {
      padding: 0 $padding-medium $padding-medium 0;
      width: 26rem;
    }
  }
</style>
