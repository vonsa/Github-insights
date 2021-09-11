import { log } from 'src/debugging/logger'
import { mapUserToProfile } from 'src/mappers/user/user'
import { profiles$, updateProfile } from 'src/stores/profiles'
import type { Profile, ProfileFromKeys, ProfileKey } from 'src/types/profiles-types'
import { get } from 'svelte/store'
import { fetchUser, toQueryVariables } from './queryService'

interface getUserValuesOptions {
  noCache: boolean
}

function hasAllKeys<T extends ProfileKey[]>(
  keys: T,
  profile: Partial<Profile>,
): profile is ProfileFromKeys<T> {
  return keys.every((key) => !!profile[key])
}

async function getProfileValues<T extends ProfileKey[]>(
  userName: string,
  keys: T,
  options?: getUserValuesOptions,
): Promise<({ login: string } & ProfileFromKeys<T>) | undefined> {
  const storedUser = get(profiles$)[userName]
  let fetchKeys: (keyof Profile)[] | undefined

  if (storedUser && !options?.noCache) {
    if (hasAllKeys(keys, storedUser)) {
      return getKeysFromProfile(keys, storedUser)
    }

    fetchKeys = keys.filter((key) => !storedUser[key])
  }

  const queryKeys = toQueryVariables(fetchKeys || keys)
  const userResponse = await fetchUser(userName, queryKeys)
  const mappedUser = mapUserToProfile(userResponse)

  if (!mappedUser) {
    return undefined
  }

  const user = { ...storedUser, ...mappedUser }
  updateProfile(user)

  if (hasAllKeys(keys, user)) {
    return user
  }

  log('Could not retrieve all property values from user')
  return undefined
}

function getKeysFromProfile<T extends ProfileKey[]>(keys: T, user: Profile) {
  const mappedKeys: Profile = keys.reduce(
    (acc, key) => {
      return { ...acc, [key]: user[key] }
    },
    { login: user.login },
  )

  if (hasAllKeys(keys, mappedKeys)) {
    return mappedKeys
  }

  log('Could not retrieve all property values from user')
  return undefined
}

export { getProfileValues }
