import type { UserStats } from 'src/GraphQL/types/UserStats'

export const userStatsMock: UserStats = {
  __typename: 'User',
  repositoriesContributedTo: {
    __typename: 'RepositoryConnection',
    totalCount: 244,
  },
  pullRequests: {
    __typename: 'PullRequestConnection',
    totalCount: 1086,
  },
  repositoriesStats: {
    __typename: 'RepositoryConnection',
    totalCount: 191,
    nodes: [
      {
        __typename: 'Repository',
        stargazerCount: 6498,
      },
      {
        __typename: 'Repository',
        stargazerCount: 118,
      },
      {
        __typename: 'Repository',
        stargazerCount: 101,
      },
      {
        __typename: 'Repository',
        stargazerCount: 75,
      },
      {
        __typename: 'Repository',
        stargazerCount: 40,
      },
      {
        __typename: 'Repository',
        stargazerCount: 39,
      },
      {
        __typename: 'Repository',
        stargazerCount: 26,
      },
      {
        __typename: 'Repository',
        stargazerCount: 24,
      },
      {
        __typename: 'Repository',
        stargazerCount: 24,
      },
      {
        __typename: 'Repository',
        stargazerCount: 24,
      },
    ],
  },
  followers: {
    __typename: 'FollowerConnection',
    totalCount: 4511,
  },
  contributionsCollection: {
    __typename: 'ContributionsCollection',
    totalCommitContributions: 3904,
    restrictedContributionsCount: 0,
  },
  issues: {
    __typename: 'IssueConnection',
    totalCount: 1013,
  },
}
