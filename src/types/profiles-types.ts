import type { UserInfo } from 'src/GraphQL/types/UserInfo'

export interface Profile {
  login: string
  info?: Omit<UserInfo, '__typename'>
  stats?: {
    stars: number
    followers: number
    repositories: number
    commits: number
    pullRequests: number
    issues: number
  }
  interests?: {
    languages: string[]
    frameworks: string[]
    topics: string[]
  }
  repositories?: any[]
  previousSearchResults?: any[]
}

export type ProfileKey = keyof Profile

export type ProfileFromKeys<T extends ProfileKey[]> = {
  [K in T[number]]: K extends keyof Profile ? NonNullable<Profile[K]> : never
}
