<script context="module" lang="ts">
  export interface ShowcaseCard {
    icon: Icon
    label: string
    count: number
  }
</script>

<script lang="ts">
  import MaskedIcon from './Decoration/MaskedIcon.svelte'
  import type { Icon } from 'src/assets/icons/icons'

  export let icon: Icon
  export let label: string
  export let count: number
</script>

<div class="container">
  <div class="card">
    <MaskedIcon {icon} styles={{ width: { default: '60%' } }} />
    <h4 class="label">{label}</h4>
    <div class="count">
      <h2 class="count-title">{count}</h2>
      <MaskedIcon icon="star" />
    </div>
  </div>
</div>

<style lang="scss">
  @import '../scss/_mixins.scss';
  @import '../scss/_variables.scss';

  .container {
    width: 300px;
    height: 300px;
    padding: 2rem;
    @include flex-center;
  }

  .card {
    border-radius: 2rem;
    background: #eee;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
    position: relative;
    @include flex-center;
    flex-direction: column;
    padding: 2rem;
    width: 100%;
    height: 100%;
    text-align: center;
  }

  .label {
    margin: 0;
  }

  .count {
    display: flex;
  }
  .count-title {
    font-family: $font-primary;
    font-weight: 900;
    margin: 0;
  }
</style>
