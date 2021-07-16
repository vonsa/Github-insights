<script lang="ts">
  function login() {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&type=user_agent`
  }
</script>

<button on:click={login}>Login</button>
