import { ApolloClient, ApolloLink, InMemoryCache, HttpLink, gql, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { logout } from 'src/stores/auth'

const httpLink = new HttpLink({ uri: 'https://api.github.com/graphql' })

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('auth_token')

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

export function query(query: string, variables: Record<string, unknown>) {
  return client.query({
    query: gql`
      ${query}
    `,
    variables,
  })
}
