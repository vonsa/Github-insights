import { gql } from '@apollo/client'

/*
  https://docs.github.com/en/github/searching-for-information-on-github/searching-on-github/searching-for-repositories
*/

export const SEARCH_REPOSITORY = gql`
  query SearchRepositories($query: String!) {
    search(first: 10, query: $query, type: REPOSITORY) {
      edges {
        node {
          ... on Repository {
            stargazerCount
            name
          }
        }
      }
    }
  }
`
