<script lang="ts">
  import _ from 'lodash'
  import { query } from 'src/GraphQL/apollo'
  import { QUERY_USER } from 'src/GraphQL/Queries/User/user-queries'
  import type { UserVariables } from 'src/GraphQL/types/User'
  import type { UserStats } from 'src/GraphQL/types/UserStats'
  import { userStatsMapper } from 'src/mappers/user/userStats'
  import { updateProfile, profiles$ } from 'src/stores/profiles'
  import List from './List.svelte'
  import Spinner from './UI/Spinner.svelte'

  export let userName: string

  async function getUserStats(userName: string) {
    const storedProfile = $profiles$.find((profile) => profile.name === userName)

    let stats

    if (storedProfile && storedProfile.stats) {
      stats = storedProfile.stats
    } else {
      const response = await query<{ user: UserStats }, UserVariables>(QUERY_USER, {
        user: userName,
        stats: true,
      })

      stats = userStatsMapper(response.data.user)
      updateProfile({ name: userName, stats })
    }

    return stats
  }
</script>

{#await getUserStats(userName)}
  <Spinner />
{:then user}
  <h2 class="name">{userName}</h2>
  <List items={user} />
{/await}
