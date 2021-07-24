<script lang="ts">
  import User from '../Components/User.svelte'
  import type { UserInfo } from 'src/types/User/UserInfo'
  import RankedItems from '../Components/RankedItems.svelte'
  import Tabs from '../Components/UI/Tabs.svelte'
  import { getBaseUrl } from 'src/util/url'
  import { token$, login } from 'src/stores/auth'
  import { setParam } from 'src/stores/searchParams'
  import QueryFromUrl from '../Components/Hoc/QueryFromUrl.svelte'
  import ShareString from '../Components/ShareString.svelte'

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

<Tabs tabs={['Login', 'View data', 'Share link']} disableNextTabs let:activeTab let:next>
  {#if activeTab === 0}
    {#if !$token$}
      <h3>The first step is to authenticate using Github</h3>
      <button
        on:click={() => {
          login(getBaseUrl())
        }}>Authenticate using Github</button
      >
    {:else}
      {next()}
    {/if}
  {/if}
  {#if activeTab === 1}
    <ShareString text={window.location.href} />

    <button
      on:click={() => {
        setParam('query', 'QUERY_USER')
        setParam('variables', { user: 'ljharb', firstRepos: 3 })
      }}>set param</button
    >
    <QueryFromUrl let:data>
      <User {...getUserInfo(data.data.user)} />
      <RankedItems items={getRankedItems(data.data.user.repositories)} />
    </QueryFromUrl>
  {/if}
  {#if activeTab === 2}
    <p>tab 3</p>
  {/if}
</Tabs>
