import type { UserInfo } from './UserInfo'
import type { UserInterests } from './UserInterests'
import type { UserPopularity } from './UserPopularity'

export interface User {
  name: string
  login: string
  details: UserInfo
  popularity: UserPopularity
  interests: UserInterests
  languages: string[]
  frameworks: string[]
  tags: string[]
}
