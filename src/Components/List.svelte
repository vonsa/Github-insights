<script lang="ts">
  export let items: Record<string, string>
</script>

<div class="list">
  {#each Object.entries(items) as [property, value]}
    <slot name="item" {property} {value}>
      <div class="item">
        <span class="property">{property}: </span>
        <span class="value">{value}</span>
      </div>
    </slot>
  {/each}
</div>
