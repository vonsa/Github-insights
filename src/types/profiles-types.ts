export interface Profile {
  login: string
  info?: {
    login: string
    createdAt: string
    avatarUrl: string
    company: string | null
    websiteUrl: string
  }
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
