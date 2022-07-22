<script lang="ts">
  import { token$ } from '@/services/authService'
</script>

{#if $token$}
  <slot />
{/if}
