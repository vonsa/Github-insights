import type { User_user } from 'src/GraphQL/types/User'
import type { Profile } from 'src/types/profiles-types'

export function userInfoMapper({
  name,
  avatarUrl,
  company,
  createdAt,
  websiteUrl,
  url,
}: Partial<User_user>): Profile['info'] | undefined {
  if (!createdAt) {
    return undefined
  }

  return {
    name: name || null,
    avatarUrl,
    company: company || null,
    createdAt,
    websiteUrl,
    url,
  }
}
