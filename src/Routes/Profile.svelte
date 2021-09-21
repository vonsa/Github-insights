<script lang="ts">
  import Image from '../Components/Decoration/Image.svelte'
  import RankedItems from '../Components/DataVisualization/RankedItems.svelte'
  import type { RankedItemsProp } from '../Components/DataVisualization/RankedItems.svelte'
  import GridRow from '../Components/Layout/GridRow.svelte'
  import Select from '../Components/UI/Select.svelte'
  import Row from '../Components/Layout/Row.svelte'
  import List from '../Components/DataVisualization/List.svelte'
  import type { Profile } from 'src/types/profiles-types'
  import { log } from 'src/debugging/logger'
  import { getProfileValues } from 'src/services/profileService'
  import { notify } from 'src/services/notificationService'
  import { profiles$ } from 'src/stores/profiles'
  import { login$, token$ } from 'src/services/authService'
  import Route from '../Components/Hoc/Route.svelte'
  import { replace } from 'svelte-spa-router'
  import Input from '../Components/UI/Input.svelte'
  import IconButton from '../Components/UI/IconButton.svelte'
  import LoadingOverlay from '../Components/Decoration/LoadingOverlay.svelte'
  import CenteredSpinner from '../Components/UI/CenteredSpinner.svelte'

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
          <Select items={storedProfiles} selected={activeProfile} on:change={onSwitchProfile} />
        </div>
      </div>
    </div>
    {#if loading && !userData}
      <CenteredSpinner />
    {:else if userData}
      <Row>
        <div class="user-info-row">
          <GridRow>
            <div class="avatar" slot="left">
              <a href={userData.info.url}>
                <Image src={userData.info.avatarUrl} alt="avatar" />
              </a>
            </div>
            <div slot="right" class="right">
              <div class="name-container">
                <h2 class="name">{userData.login}</h2>
                <a href={userData.info.url}>
                  <IconButton icon="external-link" />
                </a>
              </div>
              <List items={userData.stats} />
            </div>
          </GridRow>
        </div>
      </Row>

      {#if rankedItems}
        <div class="repositories">
          <h2 class="repositories-title">Top contributed repositories</h2>
          <div class="ranked-items">
            <RankedItems items={rankedItems} />
          </div>
        </div>
      {/if}

      {#if loading}
        <LoadingOverlay />
        <CenteredSpinner />
      {/if}
    {/if}
  </div>
</Route>

<style lang="scss">
  @import 'src/scss/_variables.scss';
  @import 'src/scss/_mixins.scss';

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;

    @include media-small {
      display: block;
    }
  }

  .manage-profiles {
    display: grid;
    align-items: center;
    margin-bottom: $margin-small;
    max-width: 58rem;
    gap: $margin-small;

    @include media-small {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }

    & .add-profile {
      display: flex;

      @include media-small {
        margin-right: $margin-small;
      }
    }

    & .profile-select {
      display: flex;
      align-items: center;

      & .select-label {
        width: 100%;
        margin-right: $margin-small;

        @include media-small {
          width: auto;
        }
      }
    }
  }

  .user-info-row {
    padding: $padding-medium;
    border-radius: $border-radius-medium;
    border: 1px solid $color-grey;

    @include media-small {
      border: none;
      padding: 0;
      border-radius: 0;
    }
  }

  .name-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: $margin-small;

    @include media-small {
      justify-content: flex-start;
    }

    & .name {
      margin-right: $margin-small;
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
    text-align: center;

    @include media-small {
      text-align: left;
    }
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
</style>
