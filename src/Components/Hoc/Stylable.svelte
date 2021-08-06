<script lang="ts">
  import { generateStyleString } from '../../util/styles'
  import type { StylesObject, StyleConfig, Styles } from '../../util/styles'

  export let styles: StylesObject | Styles

  let style: string

  function applyStyles(state?: keyof StyleConfig) {
    style = generateStyleString(styles, state)
  }

  applyStyles('default')
</script>

<div
  class="stylable"
  {style}
  on:mouseover={() => applyStyles('hover')}
  on:mouseout={() => applyStyles('default')}
  on:click
>
  <slot />
</div>

<style lang="scss">
  .stylable {
    width: 100%;
    height: 100%;
  }
</style>
