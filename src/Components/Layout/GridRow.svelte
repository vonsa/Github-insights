<div class="grid">
  <div class="left">
    <slot name="left" />
  </div>
  <div class="right">
    <slot name="right" />
  </div>
</div>

<style lang="scss">
  @import 'src/scss/_variables.scss';
  @import 'src/scss/_mixins.scss';

  .grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    row-gap: $column-gap-small;
    justify-items: center;

    @include media-small {
      justify-items: start;
    }

    @include media-small {
      grid-template-columns: auto 1fr;
      grid-template-rows: 100%;
      column-gap: $column-gap-medium;
    }
  }
</style>
