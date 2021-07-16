// export const GET_USER = (user: string) => {
//   return gql`
//     query {
//       viewer {
//         login
//       }
//     }
//   `
// }

export const GET_REPOSITORY = (owner: string, repo: string) => {
  return `
    query {
        repository(owner: "${owner}", name: "${repo}"){
          id
          nameWithOwner
          description
          url
        }
      }
    `
}

export const GET_RATE_LIMITS = `
  query {
    viewer {
      login
    }
    rateLimit {
      limit
      cost
      remaining
      resetAt
    }
  }
`
