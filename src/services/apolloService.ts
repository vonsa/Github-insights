import fetch from 'cross-fetch'
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink,
  from,
  ApolloQueryResult,
  QueryOptions,
  OperationVariables,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { logout, promptLogin$, token$ } from 'src/services/authService'

const httpLink = new HttpLink({ uri: 'https://api.github.com/graphql', fetch })

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

export function query<Response = any>(
  options: QueryOptions<OperationVariables, Response>,
): Promise<ApolloQueryResult<Response>> {
  return client.query<Response>({
    ...options,
  })
}
