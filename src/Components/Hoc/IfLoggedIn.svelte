<script lang="ts">
  import { token$ } from 'src/services/authService'
</script>

{#if $token$}
  <slot />
{/if}
