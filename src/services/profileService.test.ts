import { addProfile } from '../stores/profiles'
import { getProfileValues } from './profileService'
import { mockProfile } from '../testing/mocks/profile'

describe('getProfileValues', () => {
  it('should return a profile containing login, info and stats', async () => {
    addProfile(mockProfile)

    const existingProfile = await getProfileValues('vonsa', ['info', 'stats'])

    expect(existingProfile).toEqual({
      info: mockProfile.info,
      stats: mockProfile.stats,
      login: mockProfile.login,
    })
  })
})
