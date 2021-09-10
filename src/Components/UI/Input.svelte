<script lang="ts">
  import { createEventDispatcher } from 'svelte'

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
<button class="btn" on:click={() => onClick()}>{buttonLabel}</button>

<style lang="scss">
  @import 'src/scss/_mixins.scss';
  @import 'src/scss/_variables.scss';

  .btn {
    @include button;
    background: $color-black;
    color: $color-white;
  }

  .input {
    @include text-input;
  }
</style>
