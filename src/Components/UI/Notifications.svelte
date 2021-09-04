<script lang="ts">
  import { fly } from 'svelte/transition'
  import { notifications$ } from 'src/stores/notifications'
  import { flip } from 'svelte/animate'
  import { onDestroy } from 'svelte'
  import Notification from './Notification.svelte'

  const body = document.querySelector('body')

  let link: HTMLElement

  $: if (link && body) {
    body?.appendChild(link)
  }

  onDestroy(() => {
    if (link.parentElement === body) {
      body?.removeChild(link)
    }
  })
</script>

<div class="body-link" bind:this={link}>
  {#each $notifications$ as notification (notification.id)}
    <div
      class="notification"
      animate:flip={{ duration: 400 }}
      out:fly={{ y: -40, duration: 400 }}
      in:fly={{ y: 40, duration: 400 }}
    >
      <Notification type={notification.type} message={notification.title} />
    </div>
  {/each}
</div>

<style lang="scss">
  @import 'src/scss/_variables.scss';
  .body-link {
    position: fixed;
    right: 4rem;
    top: 4rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    & .notification:not(:last-child) {
      margin-bottom: $margin-small;
    }
  }
</style>
