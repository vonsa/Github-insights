<script lang="ts">
  import qs from 'qs'
  import { getBaseUrl } from 'src/util/url'
  import { afterUpdate } from 'svelte'

  let passed = false

  const params =
    window.location.search && qs.parse(window.location.search, { ignoreQueryPrefix: true })

  if (!window.location.hash) {
    window.location.href = `${getBaseUrl()}#/${params && '?' + qs.stringify(params)}`
  } else {
    passed = true
  }

  afterUpdate(() => {
    if (window.location.hash) {
      passed = true
    }
  })
</script>

{#if passed}
  <slot />
{/if}
