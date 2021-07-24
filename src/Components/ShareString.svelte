<script lang="ts">
  import Icon from './Icon.svelte'

  export let text: string

  function copy() {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log('success!')
      })
      .catch((err) => {
        console.log('Something went wrong', err)
      })
  }
</script>

<div class="container">
  <div class="text-container">{text}</div>
  <button on:click={copy}>
    <Icon icon="clipboard" width="2rem" />
  </button>
</div>

<style lang="scss">
  .container {
    display: flex;
  }
</style>
