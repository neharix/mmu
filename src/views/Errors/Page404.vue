<script setup>

import TheError from "@/components/TheError.vue";
</script>

<template>
  <the-error :status-code="404" message="pageNotFound" :is-home-link-enabled="true"></the-error>
</template>

<style scoped></style>
