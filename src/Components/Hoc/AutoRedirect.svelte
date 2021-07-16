<script lang="ts">
  import qs from 'qs'
  import { getBaseUrl } from 'src/util/url'

  const params = qs.parse(window.location.search, { ignoreQueryPrefix: true })

  if (params.redirect && typeof params.redirect === 'string') {
    const { redirect } = params
    delete params.redirect

    window.location.href = `${getBaseUrl()}#/${redirect}?${qs.stringify(params)}`
  }
</script>

<slot />
