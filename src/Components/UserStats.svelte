<script lang="ts">
  import _ from 'lodash'
  import { query } from 'src/GraphQL/apollo'
  import { QUERY_USER } from 'src/GraphQL/Queries/User/user-queries'
  import type { User, UserVariables } from 'src/GraphQL/types/User'
  import { userStatsMapper } from 'src/mappers/user/userStats'
  import List from './List.svelte'
  import Spinner from './UI/Spinner.svelte'

  export let userName: string

  async function getUserStats(userName: string) {
    const response = await query<User, UserVariables>(QUERY_USER, { user: userName, info: true })

    return userStatsMapper(response.data.user)
  }
</script>

{#await getUserStats(userName)}
  <Spinner />
{:then user}
  <h2 class="name">{userName}</h2>
  <List items={user} />
{/await}
