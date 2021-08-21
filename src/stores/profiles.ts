import { log } from 'src/debugging/logger'
import { isNumber } from 'src/util/type-helpers'
import { writable } from 'svelte/store'
import type { Profile } from './types/profiles-types'

const profileStore = writable<Profile[]>([])

const { update, subscribe } = profileStore
const profiles$ = { subscribe }

function addProfile(user: Profile) {
  update((profiles) => {
    if (isNumber(profileIndex(profiles, user.name))) {
      log('Could not add profile to store because it already exists')
      return profiles
    }

    return [...profiles, user]
  })
}

function removeProfile(user: Profile) {
  update((profiles) => {
    const index = profileIndex(profiles, user.name)
    if (!isNumber(index)) {
      log('Could not remove profile from store because it could not be found')
    } else {
      profiles.splice(index, 1)
    }

    return profiles
  })
}

function updateProfile(user: Profile) {
  update((profiles) => {
    const updatedProfiles = [...profiles]
    const index = profileIndex(profiles, user.name)

    if (!isNumber(index)) {
      updatedProfiles.push(user) - 1
    } else {
      updatedProfiles[index] = { ...updatedProfiles[index], ...user }
    }

    return updatedProfiles
  })
}

function profileIndex(profiles: Profile[], name: string) {
  const index = profiles.findIndex((profile) => profile.name === name)

  return index !== -1 ? index : undefined
}

export { profiles$, addProfile, removeProfile, updateProfile }
