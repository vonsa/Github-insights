<script lang="ts">
  import User from '../Components/User.svelte'
  import type { UserInfo } from 'src/types/User/UserInfo'
  import RankedItems from '../Components/RankedItems.svelte'
  import Tabs from '../Components/UI/Tabs.svelte'
  import { token$ } from 'src/stores/auth'
  import { setParam } from 'src/stores/searchParams'
  import QueryFromUrl from '../Components/Hoc/QueryFromUrl.svelte'
  import ShareString from '../Components/ShareString.svelte'
  import AuthenticateButton from '../Components/ProjectSpecific/AuthenticateButton.svelte'
  import MaskedIcon from '../Components/Decoration/MaskedIcon.svelte'

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

<Tabs tabs={['Login', 'View data', 'Share link']} let:activeTab let:next>
  {#if activeTab === 0}
    {#if !$token$}
      <h3>The first step is to authenticate using Github</h3>
      <AuthenticateButton />
      <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);">
        <MaskedIcon
          icon="bottle"
          styles={{
            width: { default: '2rem', hover: '80rem' },
            height: { default: '2rem', hover: '80rem' },
            'background-color': { default: 'black', hover: 'red' },
            transition: { default: 'all 0.4s ease-in-out' },
          }}
        />
      </div>
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
      <RankedItems items={getRankedItems(data.data.user.createdRepositories)} />
    </QueryFromUrl>
  {/if}
  {#if activeTab === 2}
    <p>tab 3</p>
  {/if}
</Tabs>
