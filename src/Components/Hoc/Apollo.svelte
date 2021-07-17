<script lang="ts">
  import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from '@apollo/client'
  import { setClient } from 'svelte-apollo'

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

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
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

  setClient(client)
</script>

<slot />
