<script lang="ts">
  import type { Icon } from 'src/assets/icons'
  import { getGlobalVariable } from 'src/util/css'
  import MaskedIcon from '../Decoration/MaskedIcon.svelte'

  export let label: string
  export let icon: Icon | undefined = undefined
  export let type: 'light' | 'dark' = 'dark'

  let hovered = false

  $: iconStyles = getIconStyles(hovered)

  function getIconStyles(hovered: boolean) {
    let color: string

    switch (hovered) {
      case true:
        if (type === 'light') {
          color = getGlobalVariable('color-black')
        } else {
          color = getGlobalVariable('color-white')
        }
        break
      case false:
        color = getGlobalVariable('color-white')
        break
    }
    return {
      'background-color': color,
    }
  }

  function activateHoveredState() {
    hovered = true
  }

  function disableHoveredState() {
    hovered = false
  }
</script>

<button
  class:light={type === 'light'}
  class:dark={type === 'dark'}
  on:click
  on:mouseover={activateHoveredState}
  on:focus={activateHoveredState}
  on:mouseout={disableHoveredState}
  on:blur={disableHoveredState}
>
  {#if icon}
    <div class="icon">
      <MaskedIcon {icon} size="small" styles={iconStyles} />
    </div>
  {/if}
  {label}</button
>

<style lang="scss">
  @import 'src/scss/_variables.scss';
  @import 'src/scss/_mixins.scss';
  button {
    @include button;
    display: flex;
    align-items: center;
    transition: background-color 0.2s ease;

    &.dark {
      background: $color-black;
      color: $color-white;

      &:hover {
        background: $color-blue;
      }
    }

    &.light {
      background: $color-blue;
      color: $color-white;

      &:hover {
        background: $color-white;
        color: $color-black;
      }
    }
  }

  .icon {
    margin-right: 0.64rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
