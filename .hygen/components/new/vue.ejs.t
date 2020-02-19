---
to: src/components/<%= category %>/<%= componentName || 'unnamed'%>.vue
---
<template>
  <div></div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
export default createComponent({
  setup() {}
})
</script>

// <style lang="scss" scoped></style>
