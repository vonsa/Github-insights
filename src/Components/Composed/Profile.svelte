<script lang="ts">
  import ListWithSuggestions from '../UI/ListWithSuggestions.svelte'
  import Image from '../Image.svelte'
  import List from '../List.svelte'
  import RankedItems from '../RankedItems.svelte'
  import type { RankedItemsProp } from '../RankedItems.svelte'
  import GridRow from '../Layout/GridRow.svelte'
  import Selector from '../UI/Selector.svelte'
  import Row from '../Layout/Row.svelte'
  import { addProfile, profiles$, removeProfile } from 'src/stores/profiles'
  import { topics } from 'src/GraphQL/Queries/repo-queries'

  export let repositories: RankedItemsProp
  export let stats: Record<string, string>
  export let avatar: { src: string; alt: string }
  export let name: string

  profiles$.subscribe((profiles) => {
    console.log({ profiles })
  })

  function fetchProfile(name: string) {
    console.log({ name })
  }

  function onSwitchProfile(event: Event) {
    const value = (event.target as HTMLInputElement).value
    if (value) {
      fetchProfile(value)
    }
  }
</script>

<div class="manager">
  <div class="selector">
    <h4>Select profile:</h4>
    <Selector items={['first', 'second', 'third']} on:change={onSwitchProfile} />
  </div>
  <button
    class="add"
    on:click={() => {
      addProfile('first name')
      addProfile('second name')
    }}>Add profile</button
  >
  <button class="add" on:click={() => removeProfile('first name')}>Remove profile</button>
</div>

<Row>
  <GridRow>
    <!-- Avatar -->
    <div class="avatar" slot="left">
      <Image src={avatar.src} alt={avatar.alt} />
    </div>

    <!-- Current stats -->
    <svelte:fragment slot="right">
      <h2 class="name">{name}</h2>
      <List items={stats} />
    </svelte:fragment>
  </GridRow>
</Row>

<!-- Repositories -->
<div class="repositories">
  <h2 class="repositories-title">Top repositories</h2>
  <div class="ranked-items">
    <RankedItems items={repositories} />
  </div>
</div>

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

  .name {
    margin-bottom: $margin-medium;
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
