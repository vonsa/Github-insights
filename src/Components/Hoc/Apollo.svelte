<script lang="ts">
  import { setClient } from 'svelte-apollo'
  import { client } from '../../services/apolloService'

  setClient(client)
</script>

<slot />
