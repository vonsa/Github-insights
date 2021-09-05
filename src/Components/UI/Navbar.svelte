<script lang="ts" context="module">
  import type { Icon } from 'src/assets/icons'

  export interface NavbarItem {
    label: string
    location: string
    mobileIcon?: Icon
  }
</script>

<script lang="ts">
  import MaskedIcon from '../Decoration/MaskedIcon.svelte'
  import { fade } from 'svelte/transition'

  import Image from '../Image.svelte'
  import Nav from './Nav.svelte'

  export let items: NavbarItem[]
  export let logo: string

  let mobileMenuToggled = false

  function toggleMobileMenu() {
    mobileMenuToggled = !mobileMenuToggled
  }
</script>

<div class="navbar">
  <div class="logo-container">
    <Image src={logo} alt="logo" />
  </div>
  <div class="items-desktop">
    {#each items as { label, location }}
      <div class="item">
        <Nav {label} {location} />
      </div>
    {/each}
  </div>
  <button class="mobile-toggle" on:click={toggleMobileMenu}>=</button>
  {#if mobileMenuToggled}
    <div class="mobile-menu" in:fade out:fade>
      <div class="items-mobile">
        {#each items as { label, location, mobileIcon }}
          <div class="item">
            {#if mobileIcon}
              <div class="mobile-icon">
                <MaskedIcon icon={mobileIcon} />
              </div>
            {/if}
            <Nav {label} {location} on:click={toggleMobileMenu} />
          </div>
        {/each}
      </div>
      <button class="mobile-close" on:click={toggleMobileMenu}>X</button>
    </div>
  {/if}
</div>

<style lang="scss">
  @import 'src/scss/_variables';
  @import 'src/scss/_mixins';
  .navbar {
    display: flex;
    align-items: center;
    padding: $padding-tiny;
    background: $color-offwhite;
    justify-content: space-between;

    @include media-medium {
      justify-content: flex-start;
    }
  }

  .logo-container {
    width: 12rem;
    margin-right: $margin-medium;
  }

  .items-desktop {
    display: none;

    @include media-medium {
      display: flex;
    }

    & .item:not(:last-child) {
      margin-right: $margin-small;
    }
  }

  .mobile-toggle {
    @include media-medium {
      display: none;
    }
  }

  .mobile-menu {
    background: $color-white;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;

    @include media-medium {
      display: none;
    }

    & .mobile-close {
      position: absolute;
      top: 2rem;
      right: 2rem;
    }
  }
</style>
