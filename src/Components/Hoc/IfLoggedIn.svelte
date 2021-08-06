<script lang="ts">
  import { token$ } from 'src/stores/auth'
</script>

{#if $token$}
  <slot />
{/if}
