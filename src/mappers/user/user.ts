import type { User_user } from 'src/GraphQL/types/User'
import type { Profile } from 'src/types/profiles-types'
import { userInfoMapper } from './userInfo'
import { userStatsMapper } from './userStats'

export function mapUserToProfile({
  user,
}: {
  user: Required<Pick<User_user, 'login'>> & Partial<User_user>
}): Profile | undefined {
  const repositories: Profile['repositories'] = user.repositories?.nodes || undefined
  const stats: Profile['stats'] = userStatsMapper(user)
  const info: Profile['info'] = userInfoMapper(user)

  return {
    login: user.login,
    ...(repositories ? { repositories } : {}),
    ...(stats ? { stats } : {}),
    ...(info ? { info } : {}),
  }
}
