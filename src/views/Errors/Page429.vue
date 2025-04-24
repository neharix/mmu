<script setup>

import TheError from "@/components/TheError.vue";
</script>

<template>
  <the-error :status-code="429" message="tooManyRequests"></the-error>
</template>

<style scoped></style>
