<template>
  <router-link :to="link" v-slot="{ isExactActive }">
    <div class="link" :class="{
      'link-active': isExactActive,
      'link-inactive': !isExactActive,
    }">
      <slot name="default"></slot>
    </div>
  </router-link>
</template>
<script setup>
import { useUxStore } from "@/stores/ux.store.js";

defineProps(['link'])

const uxStore = useUxStore();


</script>
