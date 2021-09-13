import { addProfile, clearProfiles } from '../stores/profiles'
import { getProfileValues } from './profileService'
import { mockProfile } from '../testing/mocks/profile'

/*
  @TODO: Add tests

  fetchUser tobecalledwith
  updateProfile tobecalledwith
  success: return user
  failure: return undefined (or throw error?) if not all property values can be retrieved
*/

afterEach(() => {
  clearProfiles()
})

describe('getProfileValues', () => {
  it('should return a profile from the store if all requested keys are available in the store', async () => {
    addProfile(mockProfile)

    const existingProfile = await getProfileValues('vonsa', ['info', 'stats'])

    expect(existingProfile).toEqual({
      info: mockProfile.info,
      stats: mockProfile.stats,
      login: mockProfile.login,
    })
  })

  it('should throw an Error when profile cannot be fetched', async () => {
    await expect(getProfileValues('vonsa', ['info', 'stats'])).rejects.toThrow()
  })
})
