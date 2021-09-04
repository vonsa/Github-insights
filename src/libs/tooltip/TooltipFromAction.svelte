<script lang="ts">
  import { onDestroy } from 'svelte'
  import type { NotificationConfig } from 'src/types/notification'

  export let title: string
  export let x: number
  export let y: number
  export let selector: string
  export let type: NotificationConfig['type'] = 'DEFAULT'

  let timeout: ReturnType<typeof window.setTimeout>
  let tooltip: HTMLElement

  $: offsetHeight = tooltip && tooltip.offsetHeight

  onDestroy(() => {
    if (timeout) {
      clearTimeout(timeout)
    }
  })
</script>

<div
  bind:this={tooltip}
  class={`tooltip ${selector}`}
  style="left: {x + 5}px; top: {y - (offsetHeight || 0)}px"
  class:error={type === 'ERROR'}
>
  {title}
</div>

<style lang="scss">
  .tooltip {
    position: fixed;
    top: 0;
    left: 0;
    will-change: transform;
    border: 1px solid #ddd;
    box-shadow: 1px 1px 1px #ddd;
    background: white;
    border-radius: 4px;
    padding: 4px;
    pointer-events: none;
    z-index: 999;

    &.error {
      background: crimson;
      color: white;
    }
  }
</style>
