<script lang="ts">
  import ListWithSuggestions from '../UI/ListWithSuggestions.svelte'
  import Image from '../Image.svelte'
  import RankedItems from '../RankedItems.svelte'
  import type { RankedItemsProp } from '../RankedItems.svelte'
  import GridRow from '../Layout/GridRow.svelte'
  import Selector from '../UI/Selector.svelte'
  import Row from '../Layout/Row.svelte'
  import { profiles$, updateProfile } from 'src/stores/profiles'
  import { topics } from 'src/GraphQL/Queries/Search/search_helpers'
  import { userStatsMapper } from 'src/mappers/user/userStats'
  import { userInfoMapper } from 'src/mappers/user/info'
  import { query } from 'src/GraphQL/apollo'
  import type { User, UserVariables } from 'src/GraphQL/types/User'
  import { QUERY_USER } from 'src/GraphQL/Queries/User/user-queries'

  export let repositories: RankedItemsProp
  export let avatar: { src: string; alt: string }

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

  async function getProfile(userName: string) {
    let profile = $profiles$.find((profile) => profile.name === userName)

    if (!profile) {
      const response = await query<{ user: User['user'] }, UserVariables>(QUERY_USER, {
        user: userName,
        stats: true,
        info: true,
        repositories: true,
        starredRepositories: true,
      })

      // @TODO: implement repositories and starredRepositories

      if (response.error || !response.data.user) {
        throw new Error('Could not fetch user from API')
      }

      const stats = userStatsMapper(response.data.user)
      const info = userInfoMapper(response.data.user)
      updateProfile({ name: userName, stats, info })
    }

    return profile
  }

  getProfile('ljharb')

  // function updateInterests(userName: string, interests: Profile['interests']) {
  //   updateProfile({ name: userName, interests })
  // }

  // function updateRepositories(userName: string, repositories: Profile['repositories']) {
  //   updateProfile({ name: userName, repositories })
  // }
</script>

<div class="manager">
  <div class="selector">
    <h4>Select profile:</h4>
    <Selector items={['first', 'second', 'third']} on:change={onSwitchProfile} />
  </div>
</div>

<Row>
  <GridRow>
    <!-- Avatar -->
    <div class="avatar" slot="left">
      <Image src={avatar.src} alt={avatar.alt} />
    </div>
    <!-- Current stats -->
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
