<script lang="ts">
  import { setClient } from 'svelte-apollo'
  import { client } from '../../GraphQL/apollo'

  setClient(client)
</script>

<slot />
