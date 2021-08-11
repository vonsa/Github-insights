<script lang="ts">
  import { linkedElements$, setTargets } from 'src/libs/MouseMove'

  let el1: HTMLElement
  let el2: HTMLElement
  let el3: HTMLElement
  let el4: HTMLElement
  let follower: HTMLElement
  let follower2: HTMLElement

  let style = ``

  $: if (el1 && el2 && el3 && el4 && follower) {
    linkedElements$.next([el1, el2, el3, el4])

    setTargets([
      {
        target: follower,
        onMouseOver: ({ element }) => {
          const { height, width, top, left } = element.getBoundingClientRect()
          style = `width: ${width}px; height: ${height}px; transform: translate(${left}px, ${top}px);`
        },
        onMouseOut: () => {
          console.log('mouse out')
          style = ``
        },
      },
      {
        target: follower2,
        onMouseOver: (...args) => {
          console.log('second follower:', args)
        },
      },
    ])
  }
</script>

<div class="block" bind:this={el1} />
<div class="block" bind:this={el2} />
<div class="block" bind:this={el3} />
<div class="block" bind:this={el4} />
<div class="follower" {style} bind:this={follower} />
<div class="follower2" bind:this={follower2} />

<style lang="scss">
  .block {
    width: 10rem;
    height: 10rem;
    background: crimson;
    margin: 3rem;
  }

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
