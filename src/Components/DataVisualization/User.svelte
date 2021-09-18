<script lang="ts">
  export let name: string | undefined = undefined
  export let login: string
  export let avatarUrl: string
  export let company: string | undefined = undefined
  export let websiteUrl: string
  export let createdAt: string
</script>

<div class="profile-card">
  <img src={avatarUrl} alt="Avatar" />
  <h2>{name || login}</h2>
  {#if company}
    <p>{company}</p>
  {/if}
  {#if websiteUrl}
    <a href={websiteUrl}>{websiteUrl}</a>
  {/if}
  <p>Created at: {createdAt}</p>
</div>

<style>
  .profile-card {
    padding: 2rem;
    display: flex;
    justify-content: center;
    text-align: center;
    border-radius: 2rem;
    border: 1px solid #555;
  }
</style>
