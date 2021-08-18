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

  .grid {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: 100%;
    column-gap: $column-gap-small;
  }
</style>
