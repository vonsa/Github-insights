<script lang="ts">
  import { query } from '@/services/apolloService'
  import { watchParam } from '@/stores/searchParams'
  import { queries } from '@/GraphQL/Queries/index'
  import { combineLatest } from 'rxjs'
  import CenteredSpinner from '../UI/CenteredSpinner.svelte'

  const { param$: queryParam$ } = watchParam('query', true)
  const { param$: variables$ } = watchParam('variables')

  const params$ = combineLatest([queryParam$, variables$])
</script>

{#if $params$ && queries[$queryParam$]}
  {#await query({ query: queries[$queryParam$], variables: $variables$ })}
    <CenteredSpinner />
  {:then data}
    <slot {data} />
  {/await}
{/if}
