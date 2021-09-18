<script lang="ts">
  import type { Icon } from 'src/assets/icons'
  import MaskedIcon from '../Decoration/MaskedIcon.svelte'

  export let label: string
  export let icon: Icon | undefined = undefined
</script>

<button on:click>
  {#if icon}
    <div class="icon">
      <MaskedIcon {icon} size="small" styles={{ 'background-color': '#fff' }} />
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
    background: $color-black;
    color: $color-white;
  }

  .icon {
    margin-right: 0.64rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
