<script lang="ts">
  import MaskedIcon from '../Decoration/MaskedIcon.svelte'

  export let width = '1.5rem'
  export let height = '1.5rem'
  export let color = 'rgba(94, 157, 255, 0.65)'
  export let hoverColor = 'rgba(74, 145, 255, 1)'
</script>

<MaskedIcon
  icon="external-link"
  styles={{
    width,
    height,
    'background-color': { default: color, hover: hoverColor },
  }}
/>
