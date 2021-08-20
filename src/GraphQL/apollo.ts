import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink,
  from,
  DocumentNode,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { logout, promptLogin$, token$ } from 'src/stores/auth'

const httpLink = new HttpLink({ uri: 'https://api.github.com/graphql' })

const authLink = new ApolloLink((operation, forward) => {
  const token = token$.getValue()

  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  })

  return forward(operation)
})

const logoutLink = onError(({ networkError }) => {
  if (networkError && 'statusCode' in networkError && networkError.statusCode === 401) {
    logout()
    promptLogin$.next(true)
  }
})

export const client = new ApolloClient({
  link: from([authLink, logoutLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Repository: {
        fields: {
          stargazers: {
            keyArgs: ['first'],
          },
        },
      },
      StargazerConnection: {
        fields: {
          edges: {
            merge(existing, incoming) {
              if (!existing) return incoming
              return [...existing, ...incoming]
            },
          },
        },
      },
    },
  }),
})

export function query(query: DocumentNode, variables: Record<string, unknown>) {
  return client.query({
    query,
    variables,
  })
}
