<script lang="ts">
  import MaskedIcon from './Decoration/MaskedIcon.svelte'
  import { showTooltip } from 'src/libs/tooltip/tooltip'

  export let text: string

  function copy() {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        showTooltip({ title: 'Copied successfully!' })
      })
      .catch((err) => {
        console.error('Something went wrong', err)
        showTooltip({ title: 'Could not copy automatically, please try it manually.' })
      })
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
    title="Testing">{text}</textarea
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
