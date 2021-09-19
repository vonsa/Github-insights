<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import Button from './Button.svelte'

  export let buttonLabel: string
  export let placeholder: string = ''

  let input: string

  const dispatch = createEventDispatcher()

  function onClick() {
    dispatch('submit', input)
    input = ''
  }
</script>

<input
  class="input"
  type="text"
  bind:value={input}
  {placeholder}
  on:keypress={(e) => {
    if (e.key === 'Enter') {
      onClick()
    }
  }}
/>
<Button label={buttonLabel} on:click={onClick} />

<style lang="scss">
  @import 'src/scss/_mixins.scss';

  .input {
    @include text-input;
  }
</style>
