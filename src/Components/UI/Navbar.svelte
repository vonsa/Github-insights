<script lang="ts">
  import MaskedIcon from '../Decoration/MaskedIcon.svelte'
  import { fade } from 'svelte/transition'

  import Image from '../Decoration/Image.svelte'
  import Nav from './Nav.svelte'
  import type { NavbarItem } from './types/Navbar'

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
  <div class="items items-desktop">
    {#each items as { label, location, action }}
      <div class="item item-desktop">
        <Nav {label} {location} {action} />
      </div>
    {/each}
  </div>
  <button class="mobile-toggle" on:click={toggleMobileMenu}>=</button>
  {#if mobileMenuToggled}
    <div class="mobile-menu" in:fade out:fade>
      <div class="items items-mobile">
        {#each items as { label, location, mobileIcon, action }}
          <div class="item item-mobile">
            {#if mobileIcon}
              <div class="mobile-icon">
                <MaskedIcon icon={mobileIcon} />
              </div>
            {/if}
            <Nav {label} {location} {action} on:click={toggleMobileMenu} />
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
    height: $navbar-height;
    background-color: $color-black;
    color: $color-white;

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

    & .item {
      color: $color-white;
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
    background: $color-black;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    z-index: 100;

    @include media-medium {
      display: none;
    }

    & .mobile-close {
      position: absolute;
      top: 2rem;
      right: 2rem;
    }

    & .items-mobile {
      display: flex;
      flex-direction: column;
      justify-content: center;

      & .item-mobile {
        &:not(:last-child) {
          margin-bottom: $margin-small;
        }
      }
    }
  }
</style>
