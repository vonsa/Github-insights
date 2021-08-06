<script lang="ts">
  import MaskedIcon from '../Decoration/Icon.svelte'

  export let label: string
  export let icon: string
</script>

<button on:click><MaskedIcon {icon} size="small" />{label}</button>
