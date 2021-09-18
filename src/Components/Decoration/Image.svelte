<script lang="ts">
  export let src: string
  export let alt: string
  export let contain: boolean = false
</script>

<div class="image-container">
  <img {src} {alt} class="image" class:contain />
</div>

<style lang="scss">
  .image-container {
    width: 100%;
    height: 100%;

    & .image {
      width: 100%;
      height: 100%;
      object-fit: cover;

      &.contain {
        object-fit: contain;
      }
    }
  }
</style>
