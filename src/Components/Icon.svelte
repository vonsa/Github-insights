<script lang="ts">
  import { icons } from 'src/assets/icons/icons'

  export let icon: string
  export let width: string
</script>

<img src={icons[icon]} alt="icon" style={width && `width: ${width}`} />
