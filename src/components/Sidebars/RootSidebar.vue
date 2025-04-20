<script setup>

import SidebarLink from "@/components/SidebarLink.vue";
import { useUxStore } from "@/stores/ux.store.js";
import { storeToRefs } from "pinia";

const uxStore = useUxStore();
const { sidebarExpanded } = storeToRefs(uxStore);

</script>

<template>
  <div class="flex justify-center overflow-y-auto">
    <nav class="p-4 space-y-2 overflow-x-hidden" :class="{ 'flex-1': sidebarExpanded, 'flex': !sidebarExpanded }">
      <div>
        <sidebar-link link="/">
          <div class="flex justify-center" :class="{ 'w-full': !sidebarExpanded }">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6" viewBox="0 0 24 24" fill="transparent"
              stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
          <span v-if="sidebarExpanded" class="text-nowrap">{{ $t('mainPage') }}</span>
        </sidebar-link>
        <sidebar-link link="/workspace">
          <div class="flex justify-center" :class="{ 'w-full': !sidebarExpanded }">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6" viewBox="0 0 24 24" fill="transparent"
              stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
          <span v-if="sidebarExpanded" class="text-nowrap">{{ $t('workspace') }}</span>
        </sidebar-link>

        <h4 class="uppercase text-gray-400 dark:text-gray-500 p-4 select-none text-nowrap"
          :class="{ 'text-center font-extrabold': !sidebarExpanded }">
          {{ sidebarExpanded ? $t('control') : "..." }}</h4>
        <sidebar-link :link="{ name: 'education-centers-list' }">
          <div class="flex justify-center" :class="{ 'w-full': !sidebarExpanded }">
            <svg class="w-6" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_901_948)">
                <path
                  d="M21 28V2C21 1.447 20.553 1 20 1H2C1.447 1 1 1.447 1 2V31H8V25H14V31H31V8C31 8 31 7 30 7H24M16 6V8M26 12V14M26 18V20M11 6V8M6 6V8M16 12V14M11 12V14M6 12V14M16 18V20M11 18V20M6 18V20"
                  stroke-width="2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
              </g>
              <defs>
                <clipPath id="clip0_901_948">
                  <rect width="32" height="32" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <span v-if="sidebarExpanded" class="text-nowrap">{{ $t('educationCenters') }}</span>
        </sidebar-link>

        <div class="h-16"></div>
      </div>
    </nav>
  </div>
</template>

<style scoped></style>
