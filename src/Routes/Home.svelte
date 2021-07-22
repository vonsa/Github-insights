<script lang="ts">
  import { QUERY_USER } from 'src/GraphQL/Queries/user-queries'
  import User from '../Components/User.svelte'
  import type { UserInfo } from 'src/types/User/UserInfo'
  import RankedItems from '../Components/RankedItems.svelte'
  import Spinner from '../Components/UI/Spinner.svelte'
  import Tabs from '../Components/UI/Tabs.svelte'
  import { query } from 'src/GraphQL/apollo'
  import { getBaseUrl } from 'src/util/url'
  import { authenticated$, login } from 'src/stores/auth'

  function getUserInfo(user: any): UserInfo {
    const { name, login, createdAt, avatarUrl, company, websiteUrl } = user

    return {
      name,
      login,
      createdAt,
      avatarUrl,
      company,
      websiteUrl,
    }
  }

  function getRankedItems(repositories: any) {
    return repositories.nodes.map((repository: any) => ({
      label: repository.name,
      count: repository.stargazerCount,
    }))
  }
</script>

<main>
  <Tabs tabs={['First label', 'Second label', 'Third label']} let:activeTab let:next>
    {#if activeTab === 0}
      {#if !$authenticated$}
        <h1>Not authorized</h1>
        {login(getBaseUrl())}
      {:else}
        {next()}
      {/if}
    {/if}
    {#if activeTab === 1}
      {#await query(QUERY_USER, { user: 'ljharb', firstRepos: 3 })}
        <Spinner />
      {:then { data: { user } }}
        <User {...getUserInfo(user)} />
        <RankedItems items={getRankedItems(user.repositories)} />
      {/await}
    {/if}
    {#if activeTab === 2}
      <Spinner />
    {/if}
  </Tabs>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
