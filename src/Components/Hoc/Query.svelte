<!-- <script lang="ts">
  import { gql } from '@apollo/client'
  import type { ApolloQueryResult } from '@apollo/client'
  import { getClient } from 'svelte-apollo'
  import Spinner from '../UI/Spinner.svelte'

  const apollo = getClient()

  export let query: string
  export let variables: Record<string, unknown> = {}

  let response: Promise<ApolloQueryResult<any>> = apollo.query<any>({
    query: gql`
      ${query}
    `,
    variables,
  })

  function refetch() {
    response = apollo.query<any>({
      query: gql`
        ${query}
      `,
      variables,
    })
  }
</script>

{#await response}
  <Spinner />
{:then data}
  <slot {data} />
{/await} -->
