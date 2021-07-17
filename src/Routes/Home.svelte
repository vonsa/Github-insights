<script lang="ts">
  import {
    GET_RATE_LIMITS,
    GET_REPOSITORY,
    GET_REPOSITORY_V2,
    GET_STARGAZERS,
  } from 'src/GraphQL/queries'
  import QueryButton from '../Components/QueryButton.svelte'
  import Login from '../Components/Login.svelte'
  import PaginatedQuery from '../Components/Hoc/PaginatedQuery.svelte'
</script>

<main>
  <h1>Hello there!</h1>
  <p>
    Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte
    apps.
  </p>
  <PaginatedQuery />
  <QueryButton query={GET_REPOSITORY('vonsa', 'dragimate')} label="Fetch repo" />
  <QueryButton query={GET_REPOSITORY_V2('vonsa', 'dragimate')} label="Fetch repo v2" />
  <QueryButton query={GET_RATE_LIMITS} label="Get rate limits" />
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
