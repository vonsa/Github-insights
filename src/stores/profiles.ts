import produce from 'immer'
import { log } from 'src/debugging/logger'
import { writable } from 'svelte/store'
import type { Profile } from './types/profiles-types'

interface Profiles {
  [key: string]: Profile
}

const profileStore = writable<Profiles>({})

const { update, subscribe } = profileStore
const profiles$ = { subscribe }

function addProfile(user: Profile) {
  update((profiles) => {
    if (profiles[user.name]) {
      log('Could not add profile to store because it already exists')
      return profiles
    }

    return produce(profiles, (draft) => {
      draft[user.name] = user
    })
  })
}

function removeProfile(user: Profile) {
  update((profiles) => {
    if (!profiles[user.name]) {
      log('Could not remove profile from store because it could not be found')
      return profiles
    }
    return produce(profiles, (draft) => {
      delete draft[user.name]
    })
  })
}

function updateProfile(user: Profile) {
  update((profiles) => {
    return produce(profiles, (draft) => {
      draft[user.name] = user
    })
  })
}

export { profiles$, addProfile, removeProfile, updateProfile }
