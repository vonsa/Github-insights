import type { Profile } from 'src/types/profiles-types'

export const mockProfile: Profile = {
  login: 'vonsa',
  info: {
    createdAt: '11-01-2021',
    avatarUrl: 'http://any.com',
    company: 'vonsa',
    websiteUrl: 'https://vonsa.nl',
    name: null,
    url: 'https://github.com/vonsa',
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
