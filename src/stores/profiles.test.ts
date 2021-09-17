import { get } from 'svelte/store'
import type { Profile } from '../types/profiles-types'
import { profiles$, addProfile, updateProfile, removeProfile, clearProfiles } from './profiles'
import { mockProfile } from '../services/mocks/profileMock'

afterEach(() => {
  clearProfiles()
})

const profile: Profile = mockProfile

describe('profiles store', () => {
  it('Should add a profile to profiles$', () => {
    addProfile(profile)

    const profilesAfterAdd = get(profiles$)
    expect(profilesAfterAdd[profile.login]).toEqual(profile)
  })
  it('Should add a single user to profiles$ if it is added multiple times', () => {
    addProfile(profile)
    addProfile(profile)
    addProfile(profile)

    const keys = Object.keys(get(profiles$))

    expect(keys.length).toEqual(1)
  })
  it('Should remove a profile from profiles$', () => {
    addProfile(profile)
    removeProfile(profile)

    const profilesAfterRemove = get(profiles$)
    expect(profilesAfterRemove[profile.login]).toEqual(undefined)
  })
  it('Should update a profile from profiles$', () => {
    addProfile(profile)

    const { login, info, stats } = profile
    updateProfile({ login, info, stats })

    const profilesAfterUpdate = get(profiles$)
    expect(profile).toMatchObject(profilesAfterUpdate[profile.login])
    expect(profilesAfterUpdate[profile.login]).not.toMatchObject(profile)
  })
})
