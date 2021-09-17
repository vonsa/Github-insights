import { addProfile, clearProfiles, updateProfile } from '../stores/profiles'
import { getProfileValues } from './profileService'
import { mockProfile } from './mocks/profileMock'
import { fetchUser, toQueryVariables } from './queryService'
import { userStatsMock } from '../GraphQL/Queries/mocks/userStatsMock'
import { mapUserToProfile } from '../mappers/user/user'

jest.mock('../stores/profiles', () => {
  const originalModule = jest.requireActual('../stores/profiles')

  return {
    __esModule: true,
    ...originalModule,
    updateProfile: jest.fn(),
  }
})

jest.mock('./queryService', () => {
  const originalModule = jest.requireActual('./queryService')
  const userMock = jest.requireActual('../GraphQL/Queries/mocks/userStatsMock')

  return {
    __esModule: true,
    ...originalModule,
    fetchUser: jest.fn().mockReturnValueOnce({
      user: {
        login: 'vonsa',
        ...userMock.userStatsMock,
      },
    }),
  }
})

afterEach(() => {
  clearProfiles()
})

describe('getProfileValues', () => {
  it('should return a profile from the store if all requested keys are available in the store', async () => {
    addProfile(mockProfile)

    const existingProfile = await getProfileValues('vonsa', ['info', 'stats'])

    expect(fetchUser).not.toBeCalled()
    expect(existingProfile).toEqual({
      info: mockProfile.info,
      stats: mockProfile.stats,
      login: mockProfile.login,
    })
  })

  it('should fetch remaining data if keys are partly available in the store and then update the store', async () => {
    expect.assertions(3)

    const { info, login } = mockProfile

    addProfile({ info, login })

    const response = await getProfileValues('vonsa', ['info', 'stats'])
    const mappedStats = mapUserToProfile({ user: { login: 'vonsa', ...userStatsMock } })

    expect(fetchUser).toBeCalledWith('vonsa', toQueryVariables(['stats']))
    expect(response).toEqual({ info, login, stats: mappedStats?.stats })
    expect(updateProfile).toBeCalledWith({ info, login, stats: mappedStats?.stats })
  })

  it('Should register an error when the API returns an error', async () => {
    await expect(getProfileValues('vonsa', ['info', 'stats'])).rejects.toThrow()
  })
})
