<script lang="ts">
  import { icons } from 'src/assets/icons/icons'
  import type { Icon } from 'src/assets/icons/icons'
  import Stylable from '../Hoc/Stylable.svelte'
  import type { Styles } from '../../util/styles'

  export let icon: Icon
  export let size: 'small' | 'medium' | 'large' = 'medium'
  export let styles: Styles | undefined = undefined

  const maskImageSrc = `
    -webkit-mask-image: url(${icons[icon]});
    mask-image: url(${icons[icon]});
    `

  let { width, height, ...remainingStyles } = styles || {}
</script>

<Stylable styles={{ width, height, transition: remainingStyles.transition }}>
  <div alt="icon" style={`${maskImageSrc}`} class={`mask ${size}`} on:click>
    <div class="icon">
      <Stylable styles={remainingStyles} />
    </div>
  </div>
</Stylable>

<style lang="scss">
  @import '../../scss/_variables.scss';

  .mask {
    -webkit-mask-size: contain;
    mask-size: contain;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    display: inline-block;
    max-width: 100%;
    max-height: 100%;
    min-width: 100%;
    min-height: 100%;

    &.small {
      width: $icon-size-small;
      height: $icon-size-small;
    }
    &.medium {
      width: $icon-size-medium;
      height: $icon-size-medium;
    }
    &.large {
      width: $icon-size-large;
      height: $icon-size-large;
    }
  }

  .icon {
    background-color: $icon-color;
    width: 100%;
    height: 100%;
  }
</style>
