<script lang="ts">
  import ListWithSuggestions from '../UI/ListWithSuggestions.svelte'
  import Image from '../Image.svelte'
  import RankedItems from '../RankedItems.svelte'
  import type { RankedItemsProp } from '../RankedItems.svelte'
  import GridRow from '../Layout/GridRow.svelte'
  import Selector from '../UI/Selector.svelte'
  import Row from '../Layout/Row.svelte'
  import { topics } from 'src/GraphQL/Queries/Search/search_helpers'
  import List from '../List.svelte'
  import type { Profile } from 'src/types/profiles-types'
  import { log } from 'src/debugging/logger'
  import { onMount } from 'svelte'
  import { getProfileValues } from 'src/services/profileService'

  let currentUser: string = 'ljharb'
  let userData: Omit<Required<Profile>, 'interests' | 'previousSearchResults'>

  function getRankedItems(repositories: any): RankedItemsProp {
    return repositories.slice(0, 3).map((repository: any) => ({
      label: repository.name,
      count: repository.stargazerCount,
    }))
  }

  function onSwitchProfile(event: Event) {
    const profileName = (event.target as HTMLInputElement).value
    if (profileName) {
      loadProfile(profileName)
    }
  }

  async function loadProfile(profileName: string) {
    const profile = await getProfileValues(profileName, ['login', 'info', 'repositories', 'stats'])

    if (profile) {
      userData = profile
      currentUser = profileName
    } else {
      log('Could not load profile')
    }
  }

  onMount(() => {
    loadProfile(currentUser)
  })

  $: rankedItems = userData?.repositories && getRankedItems(userData.repositories)
</script>

<div class="manager">
  <div class="selector">
    <h4>Select profile:</h4>
    <Selector items={['ljharb', 'vonsa']} on:change={onSwitchProfile} />
  </div>
</div>

{#if userData}
  <Row>
    <GridRow>
      <div class="avatar" slot="left">
        <Image src={userData.info.avatarUrl} alt="avatar" />
      </div>
      <div slot="right">
        <h2 class="name">{userData.login}</h2>
        <List items={userData.stats} />
      </div>
    </GridRow>
  </Row>

  {#if rankedItems}
    <div class="repositories">
      <h2 class="repositories-title">Top repositories</h2>
      <div class="ranked-items">
        <RankedItems items={rankedItems} />
      </div>
    </div>
  {/if}
{/if}

<!--
    Configurables:
    Languages
    Frameworks
-->

<ListWithSuggestions suggestions={topics} />

<style lang="scss">
  @import 'src/scss/_variables.scss';

  .selector {
    display: flex;
  }

  .avatar {
    width: 30rem;
    height: 30rem;
  }

  .repositories {
    & .repositories-title {
      margin-bottom: $margin-medium;
    }

    & .ranked-items {
      display: flex;
      & > :global(*:not(:last-child)) {
        margin-right: $margin-medium;
      }
    }
  }
</style>
