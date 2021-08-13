<script lang="ts">
  import { interacter } from 'src/libs/MouseMove/MouseMove'
  import type { InteractCallbackProperties } from 'src/libs/MouseMove/types'

  function onMouseOver({ detail: { interacter, interactable } }: InteractCallbackProperties) {
    const { height, width, top, left } = interactable.getBoundingClientRect()
    interacter.style.width = `${width}px`
    interacter.style.height = `${height}px`
    interacter.style.transform = `translate(${left}px, ${top}px)`
  }

  function onMouseOut({ detail: { interacter, x, y } }: InteractCallbackProperties) {
    console.warn('onMouseOut..', { interacter, x, y })

    interacter.style.width = ``
    interacter.style.height = ``
    interacter.style.transform = ``
  }
</script>

<div class="follower" use:interacter on:leave={onMouseOut} on:hovering={onMouseOver} />

<style lang="scss">
  .follower {
    position: fixed;
    background-color: black;
    top: 0;
    left: 0;
    width: 10px;
    height: 10px;
    pointer-events: none;
    transition: transform 0.4s ease, translate 1s ease, width 0.8s ease, height 0.8s ease,
      background-color 0.6s ease;
    will-change: transform;

    &:global(.active) {
      background-color: orange;
    }
  }
</style>
