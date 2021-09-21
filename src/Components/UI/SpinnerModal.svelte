<script>
  import Spinner from './Spinner.svelte'
</script>

<div class="container">
  <div class="spinner">
    <Spinner />
  </div>
  <slot />
</div>

<style lang="scss">
  @import '../../scss/_mixins.scss';
  @import '../../scss/_variables.scss';

  .container {
    padding: $padding-large;
    @include absolute-center;
    border-radius: $border-radius-medium;
    background: $color-white;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & .spinner {
      margin-bottom: $margin-medium;
    }
  }
</style>
