export const QUERY_USER_BASIC = `
    query UserBasic($user: String!){
        user(login: $user){

        }
    }
`

const USER_INFO_FRAGMENT = `
  fragment UserInfo on User {
    name
    login
    avatarUrl
    company
    websiteUrl
    createdAt
  }
`

const CONTRIBUTIONS_BY_REPOSITORY = `
    contributions {
      totalCount
    }
    repository {
      name
      stargazerCount
    }
`

const USER_CONTRIBUTION_COUNTS_FRAGMENT = `
  fragment ContributionCounts on User {
    followers {
      totalCount
    }
    repositories(first: 100) {
      totalCount
      nodes {
        name
        stargazerCount
      }
    }
    contributionsCollection {
      pullRequestContributionsByRepository {
        ${CONTRIBUTIONS_BY_REPOSITORY}
      }
      pullRequestReviewContributionsByRepository {
        ${CONTRIBUTIONS_BY_REPOSITORY}
      }
      commitContributionsByRepository {
        ${CONTRIBUTIONS_BY_REPOSITORY}
      }
      issueContributionsByRepository {
        ${CONTRIBUTIONS_BY_REPOSITORY}
      }
    }
  }
`

export const QUERY_USER = `
  ${USER_INFO_FRAGMENT}
  ${USER_CONTRIBUTION_COUNTS_FRAGMENT}
  query User($user: String!) {
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
