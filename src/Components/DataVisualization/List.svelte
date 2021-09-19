<script lang="ts">
  export let items: Record<string, string | number>
</script>

<div class="list">
  {#each Object.entries(items) as [property, value]}
    <slot name="item" {property} {value}>
      <div class="item">
        <span class="property">{property}: </span>
        <span class="value">{value}</span>
      </div>
    </slot>
  {/each}
</div>

<style lang="scss">
  @import 'src/scss/_variables.scss';
  @import 'src/scss/_mixins.scss';

  .list {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: $padding-small;

    @include media-tiny {
      grid-template-columns: 1fr 1fr;
    }

    @include media-small {
      grid-template-columns: 1fr;
    }
  }
  .item {
    display: inline-flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: $margin-small;
    padding: 0.5rem 0;

    @include media-small {
      gap: $margin-medium;
    }

    &:not(:last-of-type) {
      border-bottom: 1px solid #eee;
    }

    & .property {
      font-weight: 600;
    }
  }
</style>
