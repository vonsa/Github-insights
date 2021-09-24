<script lang="ts">
  import type { Icon } from 'src/assets/icons'
  import { getGlobalVariable } from 'src/util/css'
  import MaskedIcon from '../Decoration/MaskedIcon.svelte'

  export let icon: Icon

  let hovered: boolean

  $: styles = {
    'background-color': hovered
      ? getGlobalVariable('color-white')
      : getGlobalVariable('color-black'),
  }

  function activateHoveredState() {
    hovered = true
  }

  function disableHoveredState() {
    hovered = false
  }
</script>

<button
  on:click
  on:mouseover={activateHoveredState}
  on:focus={activateHoveredState}
  on:mouseout={disableHoveredState}
  on:blur={disableHoveredState}
>
  <div class="icon">
    <MaskedIcon {icon} size="relative" {styles} />
  </div></button
>

<style lang="scss">
  @import 'src/scss/_variables.scss';
  @import 'src/scss/_mixins.scss';

  button {
    @include button;
    display: flex;
    align-items: center;
    color: $color-white;
    transition: background-color 0.2s ease;
    padding: 1.5rem;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.2);

    @include media-small {
      padding: 0.8rem;
    }

    &:hover {
      background: $color-black;
    }
  }

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    width: 2rem;
    height: 2rem;

    @include media-small {
      width: $icon-size-tiny;
      height: $icon-size-tiny;
    }
  }
</style>
