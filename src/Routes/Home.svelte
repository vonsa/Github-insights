<script lang="ts">
  import {
    GET_RATE_LIMITS,
    GET_REPOSITORY,
    GET_REPOSITORY_V2,
    GET_STARGAZERS,
  } from 'src/GraphQL/queries'
  import { QUERY_USER } from 'src/GraphQL/Queries/user-queries'
  import QueryButton from '../Components/QueryButton.svelte'
  import Login from '../Components/Login.svelte'
  import PaginatedQuery from '../Components/Hoc/PaginatedQuery.svelte'
  import User from '../Components/User.svelte'
  import type { UserInfo } from 'src/types/User/UserInfo'
  import ShowcaseCard from '../Components/ShowcaseCard.svelte'

  function getUserInfo(user: any): UserInfo {
    const { name, login, createdAt, avatarUrl, company, websiteUrl } = user

    return {
      name,
      login,
      createdAt,
      avatarUrl,
      company,
      websiteUrl,
    }
  }
</script>

<main>
  <h1>Hello there!</h1>
  <p>
    Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte
    apps.
  </p>
  <PaginatedQuery />
  <ShowcaseCard icon="bottle" label="test" count={10} />
  <QueryButton query={GET_REPOSITORY('vonsa', 'dragimate')} label="Fetch repo" />
  <QueryButton query={GET_REPOSITORY_V2('vonsa', 'dragimate')} label="Fetch repo v2" />
  <QueryButton query={GET_RATE_LIMITS} label="Get rate limits" />
  <QueryButton query={QUERY_USER} variables={{ user: 'vonsa' }} label="Get user" let:data>
    {#if data}
      <User {...getUserInfo(data.data.user)} />
    {/if}
  </QueryButton>
  <QueryButton
    query={GET_STARGAZERS({ repo: { owner: 'facebook', name: 'flow' }, first: 10 })}
    label="Get stargazers"
  />
  <Login />
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
