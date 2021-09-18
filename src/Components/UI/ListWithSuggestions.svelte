<script context="module" lang="ts">
  export interface MappedSuggestions {
    [key: string]: boolean
  }
</script>

<script lang="ts">
  import { showTooltip } from 'src/libs/tooltip/tooltip'
  import MaskedIcon from '../Decoration/MaskedIcon.svelte'
  import DynamicList from '../Hoc/DynamicList.svelte'

  export let suggestions: readonly string[]

  let selection: string[] = []
  let inputValue: string
  let mappedSuggestions: MappedSuggestions

  $: mappedSuggestions = suggestions.reduce((acc, curr) => {
    return { ...acc, [curr]: true }
  }, {})

  function removeFromSelection(selected: string) {
    selection = selection.filter((item) => item !== selected)
    if (selected in mappedSuggestions) {
      mappedSuggestions[selected] = true
    }
  }

  function addToSelection(selected: string) {
    if (selection.includes(selected)) {
      showTooltip({ title: 'Already selected!', type: 'ERROR' })
      return
    } else if (selected === '' || selected === undefined) {
      showTooltip({ title: 'Input may not be empty', type: 'ERROR' })
      return
    }

    selection = [...selection, selected]
    if (selected in mappedSuggestions) {
      mappedSuggestions[selected] = false
    }
  }
</script>

<input type="text" bind:value={inputValue} />
<button on:click={() => addToSelection(inputValue)}>Submit</button>
{#each selection as item}
  <slot name="selected-item" {item} {removeFromSelection}>
    <div class="selected-item">
      <p>{item}</p>
      <MaskedIcon icon="close" on:click={() => removeFromSelection(item)} />
    </div>
  </slot>
{/each}
<DynamicList list={mappedSuggestions}>
  <svelte:fragment let:item>
    <button class="suggestion" on:click={() => addToSelection(item)}>{item}</button>
  </svelte:fragment>
</DynamicList>

<style lang="scss">
  .suggestion {
    background: crimson;
    color: white;
  }
</style>
