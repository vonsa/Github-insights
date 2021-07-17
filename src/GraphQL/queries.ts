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

export const GET_REPOSITORY_V3 = () => {
  return `
  query {
    repository(owner: "vonsa", name: "dragimate"){
      id
      name
      pushedAt
      description
      url
      stargazerCount
      watchers {
        totalCount
      }
      languages(first: 3) {
        nodes {
          name
        }
      }
      labels(first: 5) {
        nodes {
          name
        }
      }
      createdAt
      collaborators {
        totalCount
      }
      forkCount
      isFork
      issues {
        totalCount
      }
    }
  }
    `
}

function formatParams(params: Record<string, unknown>) {
  return Object.entries({ ...params })
    .filter(([, value]) => !!value)
    .map(([key, value]) => {
      return `${key}: ${value}`
    })
    .join(', ')
}

interface RepoParams {
  repo: {
    owner: string
    name: string
  }
  after?: string
  first?: number
}

export const GET_STARGAZERS = ({ repo, after, first = 100 }: RepoParams) => {
  const { owner, name } = repo

  return `
  query {
    repository(owner: "${owner}", name: "${name}"){
      stargazers(${formatParams({ after, first })}){
        edges {
          starredAt
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
      `
}

export const GET_REPOSITORY_V2 = (owner: string, repo: string) => {
  return `
    query {
        repository(owner: "${owner}", name: "${repo}"){
          id
          nameWithOwner
          description
          url
          created_at
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
