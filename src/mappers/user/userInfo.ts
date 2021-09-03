import type { User_user } from 'src/GraphQL/types/User'
import type { Profile } from 'src/types/profiles-types'

export function userInfoMapper({
  avatarUrl,
  company,
  createdAt,
  login,
  websiteUrl,
}: Partial<User_user>): Profile['info'] | undefined {
  if (
    !avatarUrl ||
    (!company && company !== null) ||
    !createdAt ||
    !login ||
    (!websiteUrl && websiteUrl !== null)
  )
    return undefined

  return {
    avatarUrl,
    company,
    createdAt,
    login,
    websiteUrl,
  }
}
