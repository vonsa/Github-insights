<script lang="ts">
  import { waiting$ } from 'src/services/authService'
  import LoadingOverlay from '../Decoration/LoadingOverlay.svelte'
  import SpinnerModal from '../UI/SpinnerModal.svelte'
</script>

{#if $waiting$}
  <LoadingOverlay />
  <SpinnerModal>
    <h3 class="text">Authenticating</h3>
    <p>Just one moment!</p>
  </SpinnerModal>
{/if}

<style lang="scss">
  .text {
    text-align: center;
  }
</style>
