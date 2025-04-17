<script setup>

import TheError from "@/components/TheError.vue";
</script>

<template>
  <the-error :status-code="403" message="pageForbidden" :is-home-link-enabled="true"></the-error>
</template>

<style scoped></style>
