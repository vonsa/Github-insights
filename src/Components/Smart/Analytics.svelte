<script lang="ts">
  import { analyticsEvents$ } from 'src/services/analyticsService'
  import { subscribeTo } from 'src/util/observables'

  interface PlausibleWindow extends Window {
    plausible: (event: string, options?: { callback?: () => void; props?: any }) => void
  }

  subscribeTo(analyticsEvents$, ({ name, props, callback }) => {
    if ('plausible' in window) {
      ;(window as unknown as PlausibleWindow).plausible(name, { callback, props })
    }
  })
</script>

<svelte:head>
  <script
    defer
    data-domain="github-insights.coendewaal.com"
    src="https://plausible.io/js/script.hash.outbound-links.js"></script>
  <script>
    window.plausible =
      window.plausible ||
      function () {
        ;(window.plausible.q = window.plausible.q || []).push(arguments)
      }
  </script>
</svelte:head>
