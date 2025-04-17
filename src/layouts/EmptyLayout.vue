<script setup>
import { onBeforeMount, onMounted, ref } from "vue";

onBeforeMount(() => {
  if (!(document.body.classList.contains("empty-layout"))) {
    document.body.className = "empty-layout font-montserrat bg-gradient-to-br from-emerald-300 via-emerald-400 to-emerald-500 dark:from-[#0a4141] dark:via-[#03412a] dark:to-[#061f1f] min-h-screen flex items-center justify-center px-4 transition duration-300 ease-in-out dark:text-white";
    document.querySelector("#app").className = "bg-white dark:bg-gray-800 select-none shadow-xl rounded-[30px] overflow-hidden w-full max-w-4xl flex flex-col md:flex-row"
  }
})


onMounted(() => {
  const theme = localStorage.getItem("theme")
  if (theme !== null) {
    document.querySelector("html").setAttribute("class", theme)
  } else {
    localStorage.setItem("theme", "light")
    document.querySelector("html").setAttribute("class", "light")
  }
})


</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
