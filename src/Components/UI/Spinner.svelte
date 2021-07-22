<div class="container">
  <!-- svelte-ignore a11y-media-has-caption -->
  <video width="64" height="64" autoplay loop class="preloader">
    <source src="/assets/preloader.webm" type="video/webm" />
    Your browser does not support the video tag.
  </video>
</div>

<style lang="scss">
  @import '../../scss/_mixins.scss';
  @import '../../scss/_variables.scss';

  .container {
    padding: $padding-medium;
    @include absolute-center;
  }
</style>
