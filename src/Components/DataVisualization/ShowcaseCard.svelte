<script context="module" lang="ts">
  export interface ShowcaseCard {
    icon: Icon
    label: string
    count: number
    backgroundColor: string
    url?: string
  }
</script>

<script lang="ts">
  import type { Icon } from 'src/assets/icons'
  import { icons } from 'src/assets/icons'
  import MaskedIcon from '../Decoration/MaskedIcon.svelte'
  import Image from '../Decoration/Image.svelte'
  import IconButton from '../UI/IconButton.svelte'

  export let icon: Icon
  export let label: string
  export let count: number
  export let url: string | undefined = undefined
  export let backgroundColor: string
</script>

<div class="container">
  <div class="card" style={`background: ${backgroundColor};`}>
    {#if url}
      <a href={url} class="link">
        <IconButton icon="external-link" />
      </a>
    {/if}
    <div class="image">
      <Image src={icons[icon]} alt="Rank icon" contain />
    </div>
    <h4 class="label">{label}</h4>
    <div class="count">
      <h2 class="count-title">{count}</h2>
      <MaskedIcon icon="star" styles={{ width: '2.4rem', height: '2.4rem' }} color="crimson" />
    </div>
  </div>
</div>

<style lang="scss">
  @import '../../scss/_mixins.scss';
  @import '../../scss/_variables.scss';

  .container {
    // width: 16rem;
    width: 100%;
    height: 100%;
    @include flex-center;
  }

  .link {
    position: absolute;
    top: 0;
    right: 0;
    margin: $margin-tiny;
  }

  .card {
    border-radius: $border-radius-small;
    box-shadow: 10px 10px 20px -8px rgba(0, 0, 0, 0.16);
    border-right: 1px solid rgba(0, 0, 0, 0.2);
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    position: relative;
    @include flex-center;
    flex-direction: column;
    padding: 2rem;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translate(-5px, -5px);
      box-shadow: 20px 20px 30px -8px rgba(0, 0, 0, 0.12);
    }

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
