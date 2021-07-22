const infoFragment = `
  fragment UserInfo on User {
    name
    login
    avatarUrl
    company
    websiteUrl
    createdAt
  }
`

const contributionsByRepository = `
    contributions {
      totalCount
    }
    repository {
      name
      stargazerCount
    }
`

const contributionFragment = `
  fragment ContributionCounts on User {
    followers {
      totalCount
    }
    repositories(first: $firstRepos, orderBy: { direction: DESC, field: STARGAZERS }, after: $cursor) {
      totalCount
      nodes {
        name
        stargazerCount
      }
      pageInfo {
        endCursor
      }
    }
    contributionsCollection {
      pullRequestContributionsByRepository {
        ${contributionsByRepository}
      }
      pullRequestReviewContributionsByRepository {
        ${contributionsByRepository}
      }
      commitContributionsByRepository {
        ${contributionsByRepository}
      }
      issueContributionsByRepository {
        ${contributionsByRepository}
      }
    }
  }
`

export const QUERY_USER = `
  ${infoFragment}
  ${contributionFragment}
  query User($user: String!, $cursor: String, $firstRepos: Int = 100) {
    user(login: $user) {
        id
      ...UserInfo
      ...ContributionCounts
    }
  }
`
// export const QUERY_USER = `
//     query User($user: String!) {
//         user(login: $user) {
//             commitComments {
//                 totalCount
//             }
//             contributionsCollection {
//                 totalPullRequestContributions
//                 totalPullRequestReviewContributions
//                 pullRequestContributionsByRepository {
//                 contributions {
//                     totalCount
//                 }
//                 repository {
//                     name
//                     stargazerCount
//                 }
//                 }
//                 pullRequestReviewContributionsByRepository {
//                 repository {
//                     name
//                     stargazerCount
//                 }
//                 contributions {
//                         totalCount
//                 }
//                 }
//                 commitContributionsByRepository {
//                 repository {
//                     name
//                     stargazerCount
//                 }
//                 contributions {
//                     totalCount
//                 }
//                 }
//                 issueContributionsByRepository {
//                 repository {
//                     name
//                 }
//                 contributions {
//                     totalCount
//                 }
//                 }
//                 popularPullRequestContribution {
//                 occurredAt
//                 pullRequest {
//                     id
//                     repository {
//                     stargazerCount
//                     }
//                 }
//             }
//             popularIssueContribution {
//                 issue {
//                     title
//                     comments {
//                         totalCount
//                     }
//                     id
//                     createdAt
//                     reactions {
//                         totalCount
//                     }
//                     isPinned
//                 }
//             }
//         }
//             followers {
//                 totalCount
//             }
//             issueComments {
//                 totalCount
//             }
//             issues {
//                 totalCount
//             }
//             packages {
//                 totalCount
//             }
//             projects {
//                 totalCount
//             }
//             pullRequests {
//                 totalCount
//             }
//             repositories(first: 100) {
//                 totalCount
//                 nodes {
//                     name
//                     stargazerCount
//                 }
//             }
//             repositoriesContributedTo {
//                 totalCount
//             }
//             repositoryDiscussions {
//                 totalCount
//             }
//             topRepositories(first: 100, orderBy: { direction: ASC, field: STARGAZERS}) {
//                 totalCount
//                 nodes {
//                 name
//                 stargazerCount
//                 }
//             }
//         }
//     }
// `
