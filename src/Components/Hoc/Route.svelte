<script lang="ts">
  import { fade } from 'svelte/transition'
</script>

<div in:fade={{ duration: 150 }} class="route">
  <slot />
</div>
