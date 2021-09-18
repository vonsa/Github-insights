<script context="module" lang="ts">
  export interface ShowcaseCard {
    icon: Icon
    label: string
    count: number
    url?: string
  }
</script>

<script lang="ts">
  import type { Icon } from 'src/assets/icons'
  import { icons } from 'src/assets/icons'
  import MaskedIcon from '../Decoration/MaskedIcon.svelte'
  import Image from '../Decoration/Image.svelte'

  export let icon: Icon
  export let label: string
  export let count: number
  export let url: string | undefined = undefined
</script>

<a href={url}>
  <div class="container">
    <div class="card">
      <div class="image">
        <Image src={icons[icon]} alt="Rank icon" contain />
      </div>
      <!-- <MaskedIcon {icon} styles={{ width: { default: '60%' } }} /> -->
      <h4 class="label">{label}</h4>
      <div class="count">
        <h2 class="count-title">{count}</h2>
        <MaskedIcon icon="star" styles={{ width: '2.4rem', height: '2.4rem' }} color="crimson" />
      </div>
    </div>
  </div>
</a>

<style lang="scss">
  @import '../../scss/_mixins.scss';
  @import '../../scss/_variables.scss';

  .container {
    width: 26rem;
    height: 100%;
    padding: $padding-small;
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
    // @include hover-slide;

    & .image {
      width: 9rem;
      height: 9rem;
      margin-bottom: $margin-small;
    }
  }

  .label {
    margin: 0;
  }

  .count {
    display: flex;
    align-items: center;
  }
  .count-title {
    font-family: $font-primary;
    font-weight: 900;
    margin: 0;
  }
</style>
