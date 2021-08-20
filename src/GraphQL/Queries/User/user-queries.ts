import { gql } from '@apollo/client'

export const QUERY_USER = gql`
  query User($user: String!, $info: Boolean = false, $stats: Boolean = false) {
    user(login: $user) {
      ...UserInfo @include(if: $info)
      ...UserStats @include(if: $stats)
    }
  }

  fragment UserInfo on User {
    name
    login
    createdAt
    avatarUrl
    company
    websiteUrl
  }

  fragment UserStats on User {
    repositoriesContributedTo(
      first: 1
      contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]
    ) {
      totalCount
    }
    pullRequests {
      totalCount
    }
    repositories(
      first: 100
      ownerAffiliations: OWNER
      orderBy: { direction: DESC, field: STARGAZERS }
    ) {
      totalCount
      nodes {
        stargazerCount
      }
    }
    followers {
      totalCount
    }
    contributionsCollection {
      totalCommitContributions
      restrictedContributionsCount
    }
    issues {
      totalCount
    }
  }
`

/*

export const QUERY_USER = `
    query User($user: String!) {
        user(login: $user) {
            commitComments {
                totalCount
            }
            contributionsCollection {
                totalPullRequestContributions
                totalPullRequestReviewContributions
                pullRequestContributionsByRepository {
                contributions {
                    totalCount
                }
                repository {
                    name
                    stargazerCount
                }
                }
                pullRequestReviewContributionsByRepository {
                repository {
                    name
                    stargazerCount
                }
                contributions {
                        totalCount
                }
                }
                commitContributionsByRepository {
                repository {
                    name
                    stargazerCount
                }
                contributions {
                    totalCount
                }
                }
                issueContributionsByRepository {
                repository {
                    name
                }
                contributions {
                    totalCount
                }
                }
                popularPullRequestContribution {
                occurredAt
                pullRequest {
                    id
                    repository {
                    stargazerCount
                    }
                }
            }
            popularIssueContribution {
                issue {
                    title
                    comments {
                        totalCount
                    }
                    id
                    createdAt
                    reactions {
                        totalCount
                    }
                    isPinned
                }
            }
        }
            followers {
                totalCount
            }
            issueComments {
                totalCount
            }
            issues {
                totalCount
            }
            packages {
                totalCount
            }
            projects {
                totalCount
            }
            pullRequests {
                totalCount
            }
            repositories(first: 100) {
                totalCount
                nodes {
                    name
                    stargazerCount
                }
            }
            repositoriesContributedTo {
                totalCount
            }
            repositoryDiscussions {
                totalCount
            }
            topRepositories(first: 100, orderBy: { direction: ASC, field: STARGAZERS}) {
                totalCount
                nodes {
                name
                stargazerCount
                }
            }
        }
    }
`

*/
