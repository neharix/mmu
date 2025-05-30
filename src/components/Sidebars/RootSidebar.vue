<script setup>

import SidebarLink from "@/components/SidebarLink.vue";
import { useSpecialFunctionsStore } from "@/stores/api.store";
import { useUxStore } from "@/stores/ux.store.js";
import { storeToRefs } from "pinia";
import TheSpinner from "../TheSpinner.vue";
import { onBeforeMount } from "vue";
import useSidebar from "@/use/useSidebar";
import { Icon } from "@iconify/vue";
import { PowerIcon } from "@heroicons/vue/24/solid"


const uxStore = useUxStore();
const { sidebarExpanded } = storeToRefs(uxStore);
const specialFunctionsStore = useSpecialFunctionsStore();
const { serviceStatus } = storeToRefs(specialFunctionsStore);

const { toggleLinksCarousel, linksCarouselSettings, beforeMount } = useSidebar();

onBeforeMount(() => {
  beforeMount("root");
})

</script>

<template>
  <div class="mx-6 mt-4">
    <button class="btn-primary w-full flex items-center justify-center h-10"
      @click="specialFunctionsStore.toggleService()" :disabled="specialFunctionsStore.serviceTogglerLoading">
      <TheSpinner v-if="specialFunctionsStore.serviceTogglerLoading" />
      <div v-else class="flex items-center justify-center space-x-2">
        <div class="flex justify-center" :class="{ 'w-full': !sidebarExpanded }">
          <svg v-if="serviceStatus" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true" role="img" viewBox="0 0 24 24" class="iconify iconify--lucide w-5">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M18.36 6.64A9 9 0 0 1 20.77 15M6.16 6.16a9 9 0 1 0 12.68 12.68M12 2v4M2 2l20 20"></path>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true"
            role="img" viewBox="0 0 24 24" class="iconify iconify--lucide w-5">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 2v10m6.4-5.4a9 9 0 1 1-12.77.04"></path>
          </svg>
        </div>
        <span v-if="sidebarExpanded" class="text-nowrap">{{
          serviceStatus ? $t('disableService') : $t('enableService') }}</span>
      </div>
    </button>
  </div>
  <div class="flex justify-center overflow-y-auto">
    <nav class="p-4 space-y-2 overflow-x-hidden" :class="{ 'flex-1': sidebarExpanded, 'flex': !sidebarExpanded }">
      <div>
        <sidebar-link link="/">
          <div class="flex justify-center" :class="{ 'w-full': !sidebarExpanded }">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true"
              role="img" viewBox="0 0 24 24" class="iconify iconify--lucide w-6">
              <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                <path
                  d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z">
                </path>
              </g>
            </svg>
          </div>
          <span v-if="sidebarExpanded" class="text-nowrap">{{ $t('mainPage') }}</span>
        </sidebar-link>
        <sidebar-link link="/workspace">
          <div class="flex justify-center" :class="{ 'w-full': !sidebarExpanded }">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true"
              role="img" viewBox="0 0 24 24" class="iconify iconify--lucide w-6">
              <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                <path
                  d="M12 17v4m2.305-13.47l.923-.382m0-2.296l-.923-.383m2.547-1.241l-.383-.924m.383 6.468l-.383.923m2.679-6.467l.383-.924m-.001 7.392l-.382-.924m1.624-3.92l.924-.383m-.924 2.679l.924.383M22 13v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7M8 21h8">
                </path>
                <circle cx="18" cy="6" r="3"></circle>
              </g>
            </svg>
          </div>
          <span v-if="sidebarExpanded" class="text-nowrap">{{ $t('workspace') }}</span>
        </sidebar-link>

        <button class="w-full flex items-center"
          :class="{ 'pr-6 justify-between': sidebarExpanded, 'justify-center rounded-full': !sidebarExpanded }"
          @click="toggleLinksCarousel(0)">
          <h4 class="uppercase p-4 select-none text-nowrap rounded-full transition-all duration-200 ease-in-out"
            :class="{ 'text-center font-extrabold': !sidebarExpanded, 'text-gray-400 dark:text-gray-500': !(linksCarouselSettings[0] && !sidebarExpanded) }">
            {{ sidebarExpanded ? $t('control') : "..." }}</h4>
          <div v-show="sidebarExpanded"
            :class="{ '-rotate-90': linksCarouselSettings[0] && sidebarExpanded, 'rotate-0': !linksCarouselSettings[0] && sidebarExpanded }"
            class="transition duration-200 ease-in-out">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true"
              role="img" viewBox="0 0 24 24" class="iconify iconify--lucide w-6">
              <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m15 18l-6-6l6-6"></path>
            </svg>
          </div>
        </button>
        <div v-show="linksCarouselSettings[0]">
          <sidebar-link :link="{ name: 'users-list' }">
            <div class="flex justify-center" :class="{ 'w-full': !sidebarExpanded }">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true"
                role="img" viewBox="0 0 24 24" class="iconify iconify--lucide w-6">
                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                  <path d="M18 21a8 8 0 0 0-16 0"></path>
                  <circle cx="10" cy="8" r="5"></circle>
                  <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"></path>
                </g>
              </svg>
            </div>
            <span v-if="sidebarExpanded" class="text-nowrap">{{ $t('users') }}</span>
          </sidebar-link>

          <sidebar-link :link="{ name: 'education-centers-list' }">
            <div class="flex justify-center" :class="{ 'w-full': !sidebarExpanded }">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true"
                role="img" viewBox="0 0 24 24" class="iconify iconify--lucide w-6">
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Zm0-10H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2M10 6h4m-4 4h4m-4 4h4m-4 4h4">
                </path>
              </svg>
            </div>
            <span v-if="sidebarExpanded" class="text-nowrap">{{ $t('educationCenters') }}</span>
          </sidebar-link>
        </div>
        <div class="h-16"></div>
      </div>
    </nav>
  </div>
</template>

<style scoped></style>
