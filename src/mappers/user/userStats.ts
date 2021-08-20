import type { User } from 'src/GraphQL/types/User'

export function userStatsMapper<T extends User['user']>(user: T) {
  return {
    stars: getTotalStars(user),
    followers: user?.followers.totalCount || 0,
    repositories: user?.repositories.totalCount || 0,
    commits: getTotalCommits(user),
    pullRequests: user?.pullRequests.totalCount || 0,
    issues: user?.issues.totalCount || 0,
  }
}

function getTotalCommits<T extends User['user']>(user: T) {
  if (!user?.contributionsCollection) return 0

  return (
    user?.contributionsCollection.totalCommitContributions +
    user?.contributionsCollection.restrictedContributionsCount
  )
}

function getTotalStars<T extends User['user']>(user: T) {
  if (user && user.repositories.nodes && user.repositories.nodes) {
    return user.repositories.nodes.reduce((prev, curr) => {
      if (!curr) return prev
      return prev + curr.stargazerCount
    }, 0)
  }

  return 0
}
