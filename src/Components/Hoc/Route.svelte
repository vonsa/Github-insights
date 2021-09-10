<script lang="ts">
  import { fade } from 'svelte/transition'
</script>

<div in:fade={{ duration: 150 }} class="route">
  <div class="route-body">
    <slot />
  </div>
</div>

<style lang="scss">
  @import 'src/scss/_variables.scss';
  .route {
    position: relative;
    min-height: calc(100vh - #{$navbar-height});
  }

  .route-body {
    position: absolute;
    min-width: 100%;
    min-height: 100%;
    top: 0;
    left: 0;
    padding: $padding-medium;
    display: flex;
    flex-direction: column;
  }
</style>
