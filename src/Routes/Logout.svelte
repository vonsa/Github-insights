<script lang="ts">
  import Route from '../Components/Hoc/Route.svelte'
  import { logout } from '@/services/authService'

  logout()
</script>

<Route>
  <h1>Logout!</h1>
</Route>
