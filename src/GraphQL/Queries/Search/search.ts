import { gql } from '@apollo/client'

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
