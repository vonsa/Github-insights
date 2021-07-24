<script context="module" lang="ts">
  export type Tabs = string[]
</script>

<script lang="ts">
  export let tabs: Tabs
  export let controls = false
  export let allowClicks = true
  export let disableNextTabs = false

  let activeTab: number = 0

  function next() {
    activeTab += 1
  }

  function previous() {
    activeTab -= 1
  }
</script>

<div class="tabset">
  {#each tabs as label, index}
    <div class="tab" class:disabled={!!disableNextTabs && activeTab < index}>
      <input
        type="radio"
        name="tabset"
        id={`tab${index}`}
        aria-controls="marzen"
        checked={index === activeTab}
        disabled={!!disableNextTabs && activeTab < index}
        on:click={() => {
          if (allowClicks && (!disableNextTabs || (!!disableNextTabs && activeTab >= index))) {
            activeTab = index
          }
        }}
      />
      <label for={`tab${index}`}>{label}</label>
    </div>
  {/each}
</div>

<div class="container">
  <slot {activeTab} {next} {previous} />
</div>

{#if controls}
  <div class="controls">
    {#if activeTab > 0}
      <button class="previous" on:click={previous}>Previous</button>
    {/if}
    {#if activeTab < tabs.length - 1}
      <button class="next" on:click={next}>Next</button>
    {/if}
  </div>
{/if}

<style lang="scss">
  @import 'src/scss/_variables.scss';

  .container {
    position: relative;
  }

  .tab {
    &:not(:last-child) {
      @media only screen and (max-width: $media-tiny) {
        border-bottom: 1px solid #ccc;
      }
    }

    &.disabled {
      opacity: 0.45;
    }
  }

  input[type='radio'] {
    display: none;
  }

  label {
    position: relative;
    display: inline-block;
    padding: 15px 15px 25px;
    border: 1px solid transparent;
    border-bottom: 0;
    cursor: pointer;
    font-weight: 600;
    width: 100%;
    text-align: left;
  }

  label::after {
    content: '';
    position: absolute;
    left: 15px;
    bottom: 10px;
    width: 22px;
    height: 4px;
    background: #8d8d8d;
  }

  label:hover,
  input:focus + label {
    color: #06c;
  }

  label:hover::after,
  input:focus + label::after,
  input:checked + label::after {
    background: #06c;
  }

  input:checked + label {
    border-color: #ccc;
    border-bottom: 1px solid #fff;
    margin-bottom: -1px;

    @media only screen and (max-width: $media-tiny) {
      border-right: none;
      border-bottom: none;
    }
  }

  .tabset {
    display: flex;
    justify-content: flex-start;
    border-bottom: 1px solid #ccc;

    @media only screen and (max-width: $media-tiny) {
      flex-direction: column;
      border-bottom: none;
      border-right: 1px solid #ccc;
    }
  }
</style>
