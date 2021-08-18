// function calculateStats() {
//   const totalCommits =
//     user.contributionsCollection.totalCommitContributions +
//     user.contributionsCollection.restrictedContributionsCount

//   const totalStars = user.repositories.nodes.reduce((prev, curr) => {
//     return prev + curr.stargazerCount
//   }, 0)
// }

export const statsQuery = `query { 
    user(login:"vonsa"){
      repositoriesContributedTo(first: 1, contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) {
        totalCount
      }
      pullRequests {
        totalCount
      }
      repositories(first: 100, ownerAffiliations: OWNER, orderBy: {direction: DESC, field: STARGAZERS}) {
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
  }`
