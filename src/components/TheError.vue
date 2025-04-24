<script setup>
import { onBeforeMount } from 'vue';
import SiteTools from './SiteTools.vue';
import { useUxStore } from '@/stores/ux.store';
import { useRoute } from 'vue-router';
import router from '@/router';

const uxStore = useUxStore();
const route = useRoute();

const props = defineProps({
  statusCode: Number,
  message: String,
  isHomeLinkEnabled: Boolean,
})

onBeforeMount(() => {
  if (route.name !== uxStore.errorPageStatus) {
    router.push({ name: 'main' })
  }
})

</script>

<template>
  <site-tools class="absolute top-5 right-5 md:right-20 text-white" @toggle-theme="uxStore.toggleTheme()"
    :notifications="false" :without-tooltips="true" mobile-dropdown-classes="top-8 right-0"></site-tools>
  <div class="w-full h-full flex justify-center items-center px-4 md:px-0">
    <div>
      <div class="w-full my-12 hidden md:block">
        <p class="lg:text-3xl text-2xl text-center text-black dark:text-white select-none">{{ statusCode
          }} | {{
            $t(message).toUpperCase() }}</p>
      </div>
      <div class="w-full my-12 block md:hidden space-y-4">
        <p class="lg:text-5xl text-2xl text-center text-black dark:text-white select-none">{{ statusCode
          }}</p>
        <p class="lg:text-5xl text-2xl text-center text-black dark:text-white select-none">{{
          $t(message).toUpperCase() }}</p>
      </div>

      <div class="w-full flex justify-center my-12" v-if="isHomeLinkEnabled">
        <router-link to="/"
          class="flex justify-center w-50 py-2 px-2 border-none text-base rounded-xl bg-emerald-500 dark:bg-emerald-600 text-white shadow-emerald-500/30 ring-0 hover:ring-4 ring-emerald-400/10 transition-all duration-300 ease-in-out">
          Baş sahypa
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
