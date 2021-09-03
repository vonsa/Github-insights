import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink,
  from,
  DocumentNode,
  ApolloQueryResult,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { logout, promptLogin$, token$ } from 'src/services/authService'

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

export function query<Response = any, Variables = Record<string, unknown>>(
  query: DocumentNode,
  variables: Variables,
): Promise<ApolloQueryResult<Response>> {
  return client.query<Response>({
    query,
    variables,
  })
}
