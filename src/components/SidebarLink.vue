<template>
  <router-link :to="link" v-slot="{ isActive }">
    <div class="link" :class="{
      'link-active': isActive,
      'link-inactive': !isActive,
    }">
      <slot name="default"></slot>
    </div>
  </router-link>
</template>
<script setup>
import { useUxStore } from "@/stores/ux.store.js";

defineProps({
  link: {
    type: String,
    required: true,
    default: null,
  }
})

const uxStore = useUxStore();


</script>
