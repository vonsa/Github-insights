import type {
  User_user,
  User_user_contributionsCollection,
  User_user_repositoriesStats,
} from 'src/GraphQL/types/User'
import type { Profile } from 'src/types/profiles-types'

export function userStatsMapper<T extends Partial<User_user>>({
  followers,
  contributionsCollection,
  repositoriesStats,
  pullRequests,
  issues,
}: T): Profile['stats'] | undefined {
  if (!followers || !contributionsCollection || !repositoriesStats || !pullRequests || !issues) {
    return undefined
  }

  return {
    stars: getTotalStars(repositoriesStats),
    followers: followers.totalCount || 0,
    repositories: repositoriesStats.totalCount || 0,
    commits: getTotalCommits(contributionsCollection),
    pullRequests: pullRequests.totalCount || 0,
    issues: issues.totalCount || 0,
  }
}

function getTotalCommits({
  totalCommitContributions,
  restrictedContributionsCount,
}: User_user_contributionsCollection) {
  return totalCommitContributions + restrictedContributionsCount
}

function getTotalStars({ nodes }: User_user_repositoriesStats) {
  if (nodes) {
    return nodes.reduce((prev, curr) => {
      if (!curr) return prev
      return prev + curr.stargazerCount
    }, 0)
  }

  return 0
}
