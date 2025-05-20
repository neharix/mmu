<script setup>
defineProps({
  isActive: Boolean,
})
</script>
<template>
  <div v-if="isActive">
    <slot name="default"></slot>
  </div>
</template>
<style scoped></style>
