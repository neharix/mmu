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
          <!-- <sidebar-link :link="{ name: 'regions-list' }">
            <div class="flex justify-center" :class="{ 'w-full': !sidebarExpanded }">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6" viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                  <path
                    d="M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0" />
                  <circle cx="12" cy="8" r="2" />
                  <path
                    d="M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712" />
                </g>
              </svg>
            </div>
            <span v-if="sidebarExpanded" class="text-nowrap">{{ $t('regions') }}</span>
          </sidebar-link>
          <sidebar-link :link="{ name: 'regions-list' }">
            <div class="flex justify-center" :class="{ 'w-full': !sidebarExpanded }">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6" viewBox="0 0 24 24">
                <rect width="24" height="24" fill="none" />
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 7v14m4-9h2m-2-4h2M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4a4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3a3 3 0 0 0-3-3zm3-6h2M6 8h2" />
              </svg>
            </div>
            <span v-if="sidebarExpanded" class="text-nowrap">{{ $t('courses') }}</span>
          </sidebar-link> -->
          <sidebar-link :link="{ name: 'achievements-list' }">
            <div class="flex justify-center" :class="{ 'w-full': !sidebarExpanded }">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <rect width="24" height="24" fill="none" />
                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                  <path
                    d="M7.21 15L2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15M11 12L5.12 2.2M13 12l5.88-9.8M8 7h8" />
                  <circle cx="12" cy="17" r="5" />
                  <path d="M12 18v-2h-.5" />
                </g>
              </svg>
            </div>
            <span v-if="sidebarExpanded" class="text-nowrap">{{ $t('achievements') }}</span>
          </sidebar-link>
          <sidebar-link :link="{ name: 'specializations-list' }">
            <div class="flex justify-center" :class="{ 'w-full': !sidebarExpanded }">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true"
                role="img" class="w-6" viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                  <path d="M10 2v8l3-3l3 3V2"></path>
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20">
                  </path>
                </g>
              </svg>
            </div>
            <span v-if="sidebarExpanded" class="text-nowrap">{{ $t('specializations') }}</span>
          </sidebar-link>
          <sidebar-link :link="{ name: 'students-list' }">
            <div class="flex justify-center" :class="{ 'w-full': !sidebarExpanded }">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6" viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                  <path
                    d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0zM22 10v6" />
                  <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
                </g>
              </svg>
            </div>
            <span v-if="sidebarExpanded" class="text-nowrap">{{ $t('students') }}</span>
          </sidebar-link>
        </div>
        <div class="h-16"></div>
      </div>
    </nav>
  </div>
</template>

<style scoped></style>
