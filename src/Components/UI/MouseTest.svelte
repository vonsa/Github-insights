<script lang="ts">
  import { interactable } from 'src/libs/MouseMove/MouseMove'
</script>

<div class="block" use:interactable />
<div class="block" use:interactable />
<div class="block" use:interactable />
<div class="block" use:interactable />

<style lang="scss">
  .block {
    width: 10rem;
    height: 10rem;
    background: crimson;
    margin: 3rem;
  }
</style>
