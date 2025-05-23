<script setup>

import SidebarLink from "@/components/SidebarLink.vue";
import { useSpecialFunctionsStore } from "@/stores/api.store";
import { useUxStore } from "@/stores/ux.store.js";
import { storeToRefs } from "pinia";
import TheSpinner from "../TheSpinner.vue";
import { onBeforeMount, ref } from "vue";
import useSidebar from "@/use/useSidebar";
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
          <PowerIcon class="w-5" />
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
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor"
              class="w-6" version="1.1" id="Layer_1" viewBox="0 0 511.999 511.999" xml:space="preserve">
              <g>
                <g>
                  <path
                    d="M480.276,62.526H156.574c-17.493,0-31.725,14.231-31.725,31.725v28.232l-30.679-30.68l-51.975,51.975l23.592,23.592    L0,270.705l66.804,104.419H41.579c-19.579,0-35.507,15.928-35.507,35.507v38.84h177.005v-38.84    c0-19.579-15.928-35.507-35.507-35.507h-44.674l-66.83-104.459l44.077-69.235c-1.482,21.531,5.967,43.567,22.39,59.99    l12.616,12.617l9.7-9.7v67.609c0,17.493,14.231,31.724,31.725,31.724h90.733l-5.361,55.401h-25.091v30.402h22.149h158.839h22.149    v-30.402h-25.091l-5.36-55.401h90.732c17.493,0,31.725-14.231,31.725-31.724V94.252C512,76.758,497.768,62.526,480.276,62.526z     M147.569,405.526c2.815,0,5.105,2.29,5.105,5.105v8.439H36.474v-8.439c0-2.815,2.29-5.105,5.105-5.105H147.569z M105.999,148.902    c-0.277,0.245-0.556,0.485-0.83,0.735c-0.878,0.8-1.743,1.616-2.587,2.46c-0.016,0.016-0.032,0.03-0.049,0.046    s-0.03,0.032-0.046,0.049c-0.842,0.844-1.658,1.708-2.457,2.585c-0.253,0.278-0.498,0.561-0.746,0.842    c-0.353,0.398-0.714,0.79-1.058,1.196l-13.035-13.035l8.979-8.98l13.035,13.035C106.796,148.181,106.4,148.545,105.999,148.902z     M116.365,229.831c-7.548-13.358-8.017-29.656-1.423-43.384c0.046-0.095,0.092-0.19,0.138-0.284    c0.231-0.473,0.471-0.943,0.719-1.411c0.066-0.125,0.135-0.248,0.203-0.372c0.239-0.441,0.484-0.88,0.74-1.313    c0.085-0.145,0.173-0.288,0.26-0.433c0.247-0.412,0.499-0.823,0.76-1.228c0.106-0.164,0.217-0.326,0.325-0.489    c0.252-0.382,0.507-0.763,0.772-1.138c0.135-0.19,0.277-0.378,0.414-0.566c0.25-0.344,0.5-0.687,0.76-1.026    c0.178-0.231,0.365-0.456,0.548-0.684c0.233-0.291,0.462-0.584,0.703-0.87c0.254-0.303,0.52-0.597,0.783-0.894    c0.183-0.207,0.361-0.418,0.548-0.622c0.46-0.502,0.931-0.994,1.415-1.478c0.539-0.539,1.09-1.06,1.65-1.568    c0.161-0.147,0.327-0.286,0.49-0.431c0.408-0.361,0.82-0.719,1.238-1.062c0.18-0.149,0.365-0.292,0.547-0.438    c0.418-0.333,0.838-0.662,1.265-0.979c0.173-0.13,0.349-0.256,0.525-0.383c0.455-0.329,0.915-0.65,1.379-0.961    c0.149-0.1,0.298-0.2,0.449-0.298c0.52-0.339,1.046-0.667,1.576-0.984c0.099-0.06,0.198-0.121,0.297-0.179    c3.916-2.297,8.095-3.977,12.398-5.042c0.069-0.017,0.138-0.036,0.207-0.054c0.676-0.164,1.356-0.311,2.038-0.445    c0.057-0.011,0.113-0.024,0.171-0.036c0.696-0.134,1.394-0.25,2.095-0.353c0.041-0.006,0.082-0.013,0.123-0.019    c0.708-0.101,1.42-0.186,2.131-0.255c0.035-0.003,0.07-0.007,0.105-0.011c0.709-0.067,1.419-0.118,2.13-0.152    c0.044-0.002,0.086-0.005,0.13-0.007c0.692-0.032,1.385-0.048,2.078-0.05c0.064,0,0.128-0.001,0.193-0.001    c1.958,0.003,3.915,0.127,5.86,0.372c0.043,0.005,0.085,0.013,0.128,0.018c0.845,0.109,1.687,0.248,2.526,0.403    c0.246,0.046,0.492,0.095,0.738,0.145c0.649,0.131,1.294,0.279,1.938,0.437c0.285,0.071,0.572,0.136,0.855,0.212    c0.764,0.204,1.524,0.428,2.28,0.67c0.395,0.128,0.786,0.269,1.179,0.407c0.497,0.174,0.992,0.351,1.484,0.542    c0.428,0.167,0.852,0.345,1.276,0.524c0.394,0.167,0.785,0.341,1.176,0.518c0.435,0.199,0.87,0.397,1.298,0.61    c0.41,0.203,0.815,0.421,1.22,0.636c0.341,0.181,0.685,0.354,1.021,0.543l-31.927,31.927L116.365,229.831z M272.491,419.07    l5.361-55.401h81.147l5.36,55.401H272.491z M481.598,331.945c0,0.729-0.594,1.323-1.323,1.323h-93.674H250.249h-93.675    c-0.73,0-1.323-0.593-1.323-1.323v-28.309h326.348V331.945z M481.598,273.234H155.251v-39.3l69.176-69.176l-12.617-12.616    c-7.677-7.677-16.585-13.387-26.091-17.152c-0.082-0.032-0.165-0.061-0.248-0.093c-1.079-0.424-2.166-0.826-3.26-1.199    c-0.32-0.109-0.646-0.206-0.967-0.311c-0.85-0.278-1.701-0.55-2.56-0.798c-0.547-0.158-1.099-0.298-1.649-0.444    c-0.63-0.166-1.26-0.337-1.893-0.487c-0.749-0.179-1.502-0.335-2.256-0.493c-0.434-0.089-0.865-0.184-1.3-0.266    c-0.918-0.174-1.841-0.324-2.767-0.466c-0.269-0.041-0.535-0.085-0.804-0.123c-1.053-0.15-2.11-0.274-3.17-0.379    c-0.14-0.014-0.279-0.029-0.418-0.043c-1.154-0.109-2.312-0.191-3.472-0.248c-0.045-0.002-0.089-0.005-0.134-0.007    c-1.854-0.088-3.711-0.135-5.574-0.089V94.252c0-0.73,0.594-1.323,1.323-1.323h323.702c0.73,0,1.323,0.594,1.323,1.323V273.234z" />
                </g>
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
            class="transition duration-200 ease-in-out"><svg xmlns="http://www.w3.org/2000/svg" class="w-6"
              viewBox="0 0 24 24" fill="none">
              <path d="M15 6L9 12L15 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg></div>
        </button>
        <div v-show="linksCarouselSettings[0]">
          <sidebar-link :link="{ name: 'users-list' }">
            <div class="flex justify-center" :class="{ 'w-full': !sidebarExpanded }">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6" viewBox="0 0 16 16" fill="currentColor">
                <path
                  d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
              </svg>
            </div>
            <span v-if="sidebarExpanded" class="text-nowrap">{{ $t('users') }}</span>
          </sidebar-link>

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
        </div>
        <div class="h-16"></div>
      </div>
    </nav>
  </div>
</template>

<style scoped></style>
