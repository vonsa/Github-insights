<script lang="ts">
  import { createEventDispatcher, onDestroy } from 'svelte'

  import MaskedIcon from '../Decoration/MaskedIcon.svelte'

  const dispatch = createEventDispatcher()

  let body: HTMLBodyElement
  let modal: HTMLElement
  let active = true

  $: if (modal && body) {
    body.appendChild(modal)
  }

  function closeModal() {
    active = false
    dispatch('close')
  }

  onDestroy(() => {
    dispatch('close')
  })
</script>

<svelte:body bind:this={body} />

{#if active}
  <div class="modal" bind:this={modal}>
    <div class="backdrop" on:click={closeModal} />
    <div class="content-container">
      <div class="close-btn" on:click={closeModal}>
        <MaskedIcon icon="close" size="small" />
      </div>
      <div class="content">
        <slot />
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  .modal {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .backdrop {
    background: rgba(0, 0, 0, 0.33);
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

    &:hover {
      cursor: pointer;
    }
  }

  .content-container {
    position: relative;
    background: #fff;
    min-width: 30rem;
    max-width: 40rem;
    min-height: 15rem;
    max-height: 40rem;
    padding: 2rem;

    & .close-btn {
      position: absolute;
      top: 2rem;
      right: 2rem;
      text-align: center;

      &:hover {
        cursor: pointer;
      }
    }
  }
</style>
