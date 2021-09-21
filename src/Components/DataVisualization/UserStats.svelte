<script lang="ts">
  import List from './List.svelte'
  import { getProfileValues } from 'src/services/profileService'
  import CenteredSpinner from '../UI/CenteredSpinner.svelte'

  export let userName: string

  async function getUserStats(userName: string) {
    const response = await getProfileValues(userName, ['stats'])

    if (response?.stats) {
      return response.stats
    }

    console.warn('Could not retrieve user stats')

    return undefined
  }
</script>

{#await getUserStats(userName)}
  <CenteredSpinner />
{:then user}
  {#if user}
    <h2 class="name">{userName}</h2>
    <List items={user} />
  {/if}
{/await}
