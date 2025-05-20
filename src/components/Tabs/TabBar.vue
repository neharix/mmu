<script setup>
defineProps({
  center: {
    type: Boolean,
    default: false,
    required: false
  }
})
</script>
<template>
  <div
    class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
    <ul class="flex overflow-x-auto -mb-px" :class="{ 'justify-center': center }">
      <slot name="default"></slot>
    </ul>
  </div>
</template>
<style scoped></style>
