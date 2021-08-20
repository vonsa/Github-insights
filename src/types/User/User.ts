import type { UserInfo } from './UserInfo'
import type { UserInterests } from './UserInterests'

export interface User {
  name: string
  login: string
  details: UserInfo
  interests: UserInterests
  languages: string[]
  frameworks: string[]
  tags: string[]
  // Add popularity
}
