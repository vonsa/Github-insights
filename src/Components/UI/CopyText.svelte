<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import MaskedIcon from './Decoration/MaskedIcon.svelte'

  export let text: string

  const dispatch = createEventDispatcher()

  function copy() {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        dispatch('success')
      })
      .catch((err) => {
        console.error('Something went wrong', err)
        dispatch('failed')
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
    class="text-container">{text}</textarea
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
