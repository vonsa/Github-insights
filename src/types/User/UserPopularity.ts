export interface UserPopularity {
  // id: string
  followers: Followers
  repositories: Repositories
  contributionsCollection: ContributionsCollection
  // __typename: string
}

export interface ContributionsCollection {
  pullRequestContributionsByRepository: ContributionsByRepository[]
  pullRequestReviewContributionsByRepository: ContributionsByRepository[]
  commitContributionsByRepository: ContributionsByRepository[]
  issueContributionsByRepository: ContributionsByRepository[]
  __typename: string
}

export interface ContributionsByRepository {
  contributions: Followers
  repository: Node
  __typename: string
}

export interface Followers {
  totalCount: number
  __typename: string
}

export interface Node {
  name: string
  stargazerCount: number
  __typename: string
}

export interface Repositories {
  totalCount: number
  nodes: Node[]
  __typename: string
}
