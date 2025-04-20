<script setup>
import { useRoute } from "vue-router";


const route = useRoute()

const props = defineProps({
  paths: Array,
})
</script>

<template>
  <div
    class="px-3 py-4 w-full rounded-xl shadow-md dark:shadow-lg flex justify-between mb-8 bg-white dark:bg-[#112731]">
    <div class="flex items-center overflow-x-auto">
      <div v-for="(item, index) in paths" :key="index">
        <div class="flex items-center" v-if="route.name === item.routeName || item.current">
          <p class="breadcrumb-active">{{ $t(item.name) }}</p>
          <p class="mx-2 text-sm select-none" v-if="index !== paths.length - 1">/</p>
        </div>
        <div v-else class="flex items-center">
          <router-link :to="{ name: item.routeName }"
            class="text-nowrap text-[0.7rem] md:text-sm lg:text-sm px-3 my-2 py-2 hover:text-emerald-500 dark:hover:text-emerald-600 transition ease-in hover:ease-out duration-200 select-none">{{
              $t(item.name)
            }}</router-link>
          <p class="mx-2 text-sm select-none" v-if="index !== paths.length - 1">/</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
