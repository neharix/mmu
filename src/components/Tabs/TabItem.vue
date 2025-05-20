<script setup>
import { useUxStore } from "@/stores/ux.store.js";
import { storeToRefs } from "pinia";

const props = defineProps({
  isActive: {
    type: Boolean,
    required: false,
    default: false,
  }
})

const uxStore = useUxStore()
const { sidebarExpanded, sidebarHover } = storeToRefs(uxStore);
</script>

<template>
  <li :class="{ 'me-2': sidebarExpanded || sidebarHover }">
    <button :class="{
      'p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300': !props.isActive,
      'p-4 text-emerald-500 border-b-2 border-emerald-500 rounded-t-lg active dark:text-emerald-500 dark:border-emerald-500': props.isActive,
      'inline-block': sidebarExpanded,
      'hidden': !props.isActive && !sidebarExpanded,
    }" class="text-nowrap  text-xs md:text-base transition duration-200 ease-in-out select-none">
      <slot name="default"></slot>
    </button>
  </li>
</template>


<style scoped></style>
