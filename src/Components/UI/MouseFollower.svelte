<script lang="ts">
  import MagnetMouse from 'magnet-mouse'

  let el: HTMLElement
  let followStyles = `width: 11px; height: 11px;`

  function setInFollowStyles({ elem }: { elem: { width: number; height: number } }) {
    const { height, width } = elem

    followStyles = `width: ${width}px; height: ${height}px; top: -${height / 2}px; left: -${
      width / 2
    }px;`
  }

  function setOutFollowStyles() {
    followStyles = `width: 11px; height: 11px;`
  }

  $: if (el) {
    const mm = new MagnetMouse({
      magnet: {
        element: '.element',
        distance: 20,
      },
      follow: {
        element: '.follow',
        class: 'follow-mouse-active',
      },
      inCallback: setInFollowStyles,
      outCallback: setOutFollowStyles,
    })
    mm.init()
  }
</script>

<div class="follow" bind:this={el} style={followStyles} />
<div class="follow helper" />
<div class="element" />

<style lang="scss">
  .element {
    width: 200px;
    height: 200px;
    background: black;
    transition: all 0.3s ease;
  }
  .follow {
    position: absolute;
    left: 6px;
    top: -20px;
    background-color: #f0d647;
    border-radius: 100%;
    transition: transform 0.15s ease, width 0.6s ease, height 0.6s ease, border-radius 0.6s ease,
      top 0.5s ease, left 0.5s ease;
    z-index: 100;
    pointer-events: none;

    &.helper {
      width: 7px;
      height: 7px;
      left: 20px;
      top: -34px;
      transition: transform 0.2s ease;
    }
  }

  :global(.follow-mouse-active) {
    z-index: 100;
    border-radius: 0 !important;
  }
</style>
