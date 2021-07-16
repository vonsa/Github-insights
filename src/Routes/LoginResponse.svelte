<script lang="ts">
  import { querystring } from 'svelte-spa-router'
  import qs from 'qs'
  import axios from 'axios'

  $: code = $querystring && qs.parse($querystring).code

  $: if (code) {
    axios.get(`http://localhost:9999/authenticate/${code}`).then((response) => {
      localStorage.setItem('auth_token', response.data.token)
    })
  }
</script>

<h1>Login response</h1>
