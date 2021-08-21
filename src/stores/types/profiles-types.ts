export const mockProfile = {
  name: 'john',
  info: {
    login: '',
    createdAt: '11-01-2021',
    avatarUrl: 'http://any.com',
    company: 'vonsa',
    websiteUrl: 'https://vonsa.nl',
  },
  stats: {
    stars: 0,
    followers: 0,
    repositories: 0,
    commits: 0,
    pullRequests: 0,
    issues: 0,
  },
  interests: {
    languages: ['JavaScript', 'HTML', 'CSS'],
    frameworks: ['Svelte', 'React', 'Vue', 'Angular'],
    topics: ['animation', 'compiler', 'education'],
  },
  previousSearchResults: [],
}

export interface Profile {
  name: string
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
