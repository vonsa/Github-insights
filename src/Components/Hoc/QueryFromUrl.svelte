<script lang="ts">
  import { query } from 'src/services/apolloService'
  import { watchParam } from 'src/stores/searchParams'
  import Spinner from '../UI/Spinner.svelte'
  import { queries } from 'src/GraphQL/Queries/index'
  import { combineLatest } from 'rxjs'

  const queryParam$ = watchParam('query', true)
  const variables$ = watchParam('variables')

  const params$ = combineLatest([queryParam$, variables$])
</script>

{#if $params$ && queries[$queryParam$]}
  {#await query({ query: queries[$queryParam$], variables: $variables$ })}
    <Spinner />
  {:then data}
    <slot {data} />
  {/await}
{/if}
