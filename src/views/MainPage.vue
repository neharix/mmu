<script setup>
import { onBeforeMount, onBeforeUnmount } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import SiteTools from '@/components/SiteTools.vue';


onBeforeMount(() => {
  document.querySelector("#app").className = "";
})

onBeforeRouteLeave(() => {
  document.body.className = "empty-layout font-montserrat bg-gradient-to-br from-emerald-300 via-emerald-400 to-emerald-500 dark:from-[#0a4141] dark:via-[#03412a] dark:to-[#061f1f] min-h-screen flex items-center justify-center px-4 transition duration-300 ease-in-out dark:text-white";
  document.querySelector("#app").className = "bg-white dark:bg-gray-800 select-none shadow-xl rounded-[30px] overflow-hidden w-full max-w-4xl flex flex-col md:flex-row"
})

onBeforeUnmount(() => {
  document.body.className = "empty-layout font-montserrat bg-gradient-to-br from-emerald-300 via-emerald-400 to-emerald-500 dark:from-[#0a4141] dark:via-[#03412a] dark:to-[#061f1f] min-h-screen flex items-center justify-center px-4 transition duration-300 ease-in-out dark:text-white";
  document.querySelector("#app").className = "bg-white dark:bg-gray-800 select-none shadow-xl rounded-[30px] overflow-hidden w-full max-w-4xl flex flex-col md:flex-row"
})

</script>
<template>
  <div class="absolute top-5 right-5 md:right-20 text-white flex space-x-2">
    <site-tools></site-tools>
    <router-link :to="{ name: 'login-page' }"
      class="py-2 px-6 border-none text-base rounded-xl bg-emerald-500 dark:bg-emerald-600 text-white shadow-emerald-500/30 ring-0 hover:ring-4 ring-emerald-400/10 transition-all duration-300 ease-in-out">{{
        $t('login') }}</router-link>
  </div>
  <div>hello</div>
</template>
