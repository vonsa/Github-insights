<script lang="ts">
  import { gql } from '@apollo/client'
  import type { ApolloQueryResult } from '@apollo/client'
  import { getClient } from 'svelte-apollo'

  const apollo = getClient()

  export let query: string
  export let label: string
  export let variables: Record<string, unknown> = {}

  console.log('variables', variables)

  let response: Promise<ApolloQueryResult<any>> | undefined

  function fetch() {
    response = apollo.query<any>({
      query: gql`
        ${query}
      `,
      variables: variables,
    })
  }

  $: if (response) {
    response.then((data) => {
      console.log('got response', data)
    })
  }
</script>

<button on:click={fetch}>{label}</button>

{#if response}
  {#await response}
    <h1>Awaiting response</h1>
  {:then data}
    <h1>Got response</h1>
    <slot {data} />
  {/await}
{/if}
