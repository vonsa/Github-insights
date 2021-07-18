<script context="module" lang="ts">
  export interface ShowcaseCard {
    icon: string
    label: string
    count: number
  }
</script>

<script lang="ts">
  import Icon from './Icon.svelte'

  export let icon: string
  export let label: string
  export let count: number
</script>

<div class="container">
  <div class="card">
    <Icon {icon} width="60%" />
    <h2 class="count">{count}</h2>
    <h4 class="label">{label}</h4>
  </div>
</div>

<style lang="scss">
  @import '../scss/_mixins.scss';
  @import '../scss/_variables.scss';

  .container {
    width: 300px;
    height: 300px;
    padding: 2rem;
    border: 1px solid #000;
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
  }

  .label {
    margin-bottom: 0;
  }

  .count {
    position: absolute;
    bottom: 0;
    right: 0;
    transform: translate(30%, 30%);
    font-size: 6rem;
    margin: 0;
    font-family: $font-primary;
    font-weight: 900;
  }
</style>
