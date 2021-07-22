<script lang="ts">
  import { gql } from '@apollo/client'
  import type { ObservableQuery } from '@apollo/client'
  import type { DocumentNode } from '@apollo/client'
  import { getClient } from 'svelte-apollo'

  const apollo = getClient()

  let query: ObservableQuery<any, Variables>

  interface Variables {
    cursor: string | null
  }

  interface WatchQuery {
    query: DocumentNode
    variables: Variables
  }

  const queryConfig: WatchQuery = {
    query: gql`
      query Stars($cursor: String) {
        repository(owner: "facebook", name: "flow") {
          id
          stargazers(first: 10, after: $cursor) {
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
    `,
    variables: { cursor: null },
  }

  function fetchMore() {
    const cursor = query.getLastResult().data.repository.stargazers.pageInfo.endCursor

    query.fetchMore({
      variables: { cursor },
    })
  }

  function initialFetch() {
    query = apollo.watchQuery(queryConfig)
  }
</script>

<button on:click={initialFetch}>Initial fetch</button>
<button on:click={fetchMore}>Fetch more</button>
