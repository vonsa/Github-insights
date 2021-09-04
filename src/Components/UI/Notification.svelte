<script lang="ts">
  import type { NotificationConfig } from 'src/types/notification'
  import { getGlobalVariable } from 'src/util/css'
  import MaskedIcon from '../Decoration/MaskedIcon.svelte'

  export let type: NotificationConfig['type']
  export let message: string

  $: icon = getIconType(type)
  $: color = getGlobalVariable(getColor(type))

  function getIconType(type: NotificationConfig['type']): 'success' | 'error' | 'info' {
    if (type === 'SUCCESS') return 'success'
    if (type === 'ERROR') return 'error'

    return 'info'
  }

  function getColor(type: NotificationConfig['type']) {
    if (type === 'SUCCESS') return 'color-success'
    if (type === 'ERROR') return 'color-error'

    return 'color-black'
  }
</script>

<div
  class="notification"
  class:error={type === 'ERROR'}
  class:success={type === 'SUCCESS'}
  class:default={type === 'DEFAULT'}
>
  <div class="icon">
    <MaskedIcon {icon} size="small" {color} />
  </div>
  <p>{message}</p>
</div>

<style lang="scss">
  @import 'src/scss/_variables.scss';

  .notification {
    padding: $padding-small;
    display: inline-block;
    background-color: $color-white;
    box-shadow: 4px 0.3rem 2rem -0.6rem rgba(0, 0, 0, 0.28);
    border-radius: $border-radius-medium;
    display: flex;
    align-items: center;

    &.error {
      color: $color-error;
    }

    &.success {
      color: $color-success;
    }

    & .icon {
      margin-right: $margin-small;
    }
  }
</style>
