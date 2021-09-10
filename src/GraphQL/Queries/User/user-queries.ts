import { gql } from '@apollo/client'

export const QUERY_LOGGED_IN_USERNAME = gql`
  query Viewer {
    viewer {
      login
    }
  }
`

export const QUERY_USER = gql`
  query User(
    $user: String!
    $info: Boolean = false
    $stats: Boolean = false
    $repositories: Boolean = false
    $starredRepositories: Boolean = false
  ) {
    user(login: $user) {
      login
      ...UserInfo @include(if: $info)
      ...UserStats @include(if: $stats)
      ...Repositories @include(if: $repositories)
      ...StarredRepositories @include(if: $starredRepositories)
    }
  }

  fragment UserInfo on User {
    name
    createdAt
    avatarUrl
    company
    websiteUrl
    url
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
    repositoriesStats: repositories(
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

  fragment Repositories on User {
    repositories(
      ownerAffiliations: [OWNER, COLLABORATOR]
      first: 100
      orderBy: { field: STARGAZERS, direction: DESC }
    ) {
      nodes {
        name
        stargazerCount
        languages(first: 5) {
          nodes {
            name
          }
        }
        repositoryTopics(first: 40) {
          nodes {
            topic {
              name
            }
          }
        }
        createdAt
        updatedAt
        pushedAt
        isFork
        url
      }
    }
  }

  fragment StarredRepositories on User {
    starredRepositories {
      nodes {
        name
        stargazerCount
        languages(first: 5) {
          nodes {
            name
          }
        }
        repositoryTopics(first: 40) {
          nodes {
            topic {
              name
            }
          }
        }
      }
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
