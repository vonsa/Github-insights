<script>
  import Spinner from './Spinner.svelte'
</script>

<div class="container">
  <Spinner />
  <slot />
</div>

<style lang="scss">
  @import '../../scss/_mixins.scss';
  @import '../../scss/_variables.scss';

  .container {
    padding: $padding-medium;
    @include absolute-center;
  }
</style>
