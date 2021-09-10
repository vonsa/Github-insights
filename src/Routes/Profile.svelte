<script lang="ts">
  import Image from '../Components/Image.svelte'
  import RankedItems from '../Components/RankedItems.svelte'
  import type { RankedItemsProp } from '../Components/RankedItems.svelte'
  import GridRow from '../Components/Layout/GridRow.svelte'
  import Selector from '../Components/UI/Selector.svelte'
  import Row from '../Components/Layout/Row.svelte'
  import List from '../Components/List.svelte'
  import type { Profile } from 'src/types/profiles-types'
  import { log } from 'src/debugging/logger'
  import { getProfileValues } from 'src/services/profileService'
  import Spinner from '../Components/UI/Spinner.svelte'
  import { notify } from 'src/services/notificationService'
  import { profiles$ } from 'src/stores/profiles'
  import { login$, token$ } from 'src/services/authService'
  import Route from '../Components/Hoc/Route.svelte'
  import { replace } from 'svelte-spa-router'
  import Input from '../Components/UI/Input.svelte'

  let activeProfile: string
  let userData: Omit<Required<Profile>, 'interests' | 'previousSearchResults'>
  let loading: boolean

  $: if ($login$) loadProfile($login$)
  $: storedProfiles = Object.keys($profiles$)
  $: rankedItems = userData?.repositories && mapToRankedItems(userData.repositories)
  $: if (!$token$) {
    notify({ title: 'You have been logged out.' })
    replace('/')
  }

  function mapToRankedItems(repositories: any): RankedItemsProp {
    return repositories.slice(0, 3).map((repository: any) => ({
      label: repository.name,
      count: repository.stargazerCount,
      url: repository.url,
    }))
  }

  function onSwitchProfile(event: Event) {
    const profileName = (event.target as HTMLInputElement).value
    if (profileName) {
      loadProfile(profileName)
    }
  }

  async function loadProfile(profileName: string) {
    loading = true
    let profile
    try {
      profile = await getProfileValues(profileName, ['login', 'info', 'repositories', 'stats'])
    } catch (err) {
      notify({ title: 'Sorry, we could not retrieve your profile.', type: 'ERROR' })
      console.warn(err)
    }

    loading = false

    if (profile) {
      userData = profile
      activeProfile = profileName
    } else {
      log('Could not load profile')
    }
  }

  function addProfile(profile: string) {
    if (!profile) {
      notify({ title: 'Profile field may not be empty', type: 'ERROR' })
      return
    }

    loadProfile(profile)
  }
</script>

<Route>
  <div class="manager">
    <div class="container">
      <h1>Profiles</h1>
      <div class="manage-profiles">
        <div class="add-profile input">
          <Input
            buttonLabel="Search"
            placeholder="Search for profile name"
            on:submit={(e) => addProfile(e.detail)}
          />
        </div>
        <div class="profile-select input">
          <h4 class="select-label">Switch profile:</h4>
          <Selector items={storedProfiles} selected={activeProfile} on:change={onSwitchProfile} />
        </div>
      </div>
    </div>
    {#if loading && !userData}
      <Spinner />
    {:else if userData}
      <Row>
        <GridRow>
          <div class="avatar" slot="left">
            <a href={userData.info.url}>
              <Image src={userData.info.avatarUrl} alt="avatar" />
            </a>
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

      {#if loading}
        <div class="loading-overlay" />
        <Spinner />
      {/if}
    {/if}
  </div>
</Route>

<style lang="scss">
  @import 'src/scss/_variables.scss';
  @import 'src/scss/_mixins.scss';

  .manage-profiles {
    display: flex;
    align-items: center;
    margin-bottom: $margin-small;
    justify-content: space-between;
    max-width: 58rem;
    flex-wrap: wrap;
    gap: $margin-small;

    & .add-profile {
      margin-right: $margin-small;
    }

    & .profile-select {
      display: flex;
      align-items: center;

      & .select-label {
        margin-right: $margin-small;
      }
    }
  }

  .avatar {
    width: 20rem;
    height: 20rem;

    @include media-medium {
      width: 24rem;
      height: 24rem;
    }
  }

  .repositories {
    & .repositories-title {
      margin-bottom: $margin-small;
    }

    & .ranked-items {
      display: flex;
      & > :global(*:not(:last-child)) {
        margin-right: $margin-medium;
      }
    }
  }

  .name {
    margin-bottom: $margin-small;
  }

  .loading-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.6);
    top: 0;
    left: 0;
  }
</style>
