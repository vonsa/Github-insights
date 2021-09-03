<script lang="ts">
  import Tabs from '../Components/UI/Tabs.svelte'
  import { token$ } from 'src/services/authService'
  import { setParam } from 'src/stores/searchParams'
  import ShareString from '../Components/ShareString.svelte'
  import AuthenticateButton from '../Components/ProjectSpecific/AuthenticateButton.svelte'
  import MaskedIcon from '../Components/Decoration/MaskedIcon.svelte'
  import Profile from '../Components/Composed/Profile.svelte'
  import UserStats from '../Components/UserStats.svelte'
</script>

<Tabs
  tabs={['Login', 'Waiting', 'View data', 'Create profile', 'Share link']}
  let:activeTab
  let:next
>
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
    <h1>wait</h1>
  {/if}
  {#if activeTab === 2}
    <ShareString text={window.location.href} />
    <button
      on:click={() => {
        setParam('query', 'QUERY_USER')
        setParam('variables', { user: 'ljharb' })
      }}>set param</button
    >
    <Profile />
  {/if}
  {#if activeTab === 3}
    <h1>Tab</h1>
  {/if}
  {#if activeTab === 4}
    <UserStats userName="ljharb" />
  {/if}
</Tabs>
