import type { UserStats } from 'src/GraphQL/types/UserStats'

export function userStatsMapper<T extends UserStats>(user: T) {
  return {
    stars: getTotalStars(user),
    followers: user?.followers.totalCount || 0,
    repositories: user?.repositoriesStats.totalCount || 0,
    commits: getTotalCommits(user),
    pullRequests: user?.pullRequests.totalCount || 0,
    issues: user?.issues.totalCount || 0,
  }
}

function getTotalCommits<T extends UserStats>(user: T) {
  return (
    user.contributionsCollection.totalCommitContributions +
    user.contributionsCollection.restrictedContributionsCount
  )
}

function getTotalStars<T extends UserStats>(user: T) {
  if (user && user.repositoriesStats.nodes && user.repositoriesStats.nodes) {
    return user.repositoriesStats.nodes.reduce((prev, curr) => {
      if (!curr) return prev
      return prev + curr.stargazerCount
    }, 0)
  }

  return 0
}
