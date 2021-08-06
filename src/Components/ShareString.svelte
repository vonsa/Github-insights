<script lang="ts">
  import MaskedIcon from './Decoration/MaskedIcon.svelte'
  import { tooltip } from '../use/tooltip/tooltip'
  import { fromEvent } from 'rxjs'

  export let text: string

  function copy() {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // @TODO optionally combine clickEvent$ with clipboard success callback
        console.log('success!')
      })
      .catch((err) => {
        console.log('Something went wrong', err)
      })
  }

  function getTooltipEventFn(node: HTMLElement) {
    return fromEvent(node, 'click')
  }
</script>

<div class="container">
  <textarea
    readonly
    on:click={(event) => {
      event.currentTarget.select()
      copy()
    }}
    class="text-container"
    title="Testing"
    use:tooltip={{ getEvent: getTooltipEventFn, title: 'Testing title...' }}>{text}</textarea
  >
  <button on:click={copy} class="copy-btn">
    <MaskedIcon icon="clipboard" size="small" />
  </button>
</div>

<style lang="scss">
  .container {
    display: flex;
  }

  textarea {
    display: flex;
    align-items: center;
    padding: 1rem;
    border: 1px solid #ccc;
    border-right: none;
    word-break: break-all;
    resize: none;
    overflow: hidden;
    margin: 0;
    width: 50rem;
  }

  .copy-btn {
    margin: 0;
  }
</style>
