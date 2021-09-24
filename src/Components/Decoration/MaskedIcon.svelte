<script lang="ts">
  import { icons } from 'src/assets/icons'
  import type { Icon } from 'src/assets/icons'
  import Stylable from '../Hoc/Stylable.svelte'
  import type { Styles } from '../../util/styles'

  export let icon: Icon
  export let size: 'tiny' | 'small' | 'medium' | 'large' | 'relative' = 'medium'
  export let color: string = '#000'
  export let styles: Styles | undefined = undefined

  const maskImageSrc = `
    -webkit-mask-image: url(${icons[icon]});
    mask-image: url(${icons[icon]});
    `

  let width: Styles[keyof Styles]
  let height: Styles[keyof Styles]
  let remainingStyles: Styles

  $: ({ width, height, ...remainingStyles } = styles || {})
  $: outerStylable = {
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
    transition: remainingStyles.transition,
  }
  $: innerStylable = { 'background-color': color, ...remainingStyles }
</script>

<Stylable styles={outerStylable} on:click>
  <div alt="icon" style={`${maskImageSrc}`} class={`mask ${size}`}>
    <div class="icon">
      <Stylable styles={innerStylable} />
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

    &.tiny {
      width: $icon-size-tiny;
      height: $icon-size-tiny;
    }

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

    &.relative {
      width: 100%;
      height: 100%;
    }
  }

  .icon {
    width: 100%;
    height: 100%;
  }
</style>
