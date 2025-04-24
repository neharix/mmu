<script setup>

import TheError from "@/components/TheError.vue";
</script>

<template>
  <the-error :status-code="503" message="serviceUnavailable"></the-error>
</template>

<style scoped></style>
