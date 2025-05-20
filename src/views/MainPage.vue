<script setup>
import { computed, onBeforeMount, onBeforeUnmount, ref, shallowReactive } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import SiteTools from '@/components/SiteTools.vue';
import { useWindowScroll } from '@vueuse/core';


onBeforeMount(() => {
  document.body.className = "font-montserrat bg-white dark:bg-gray-800";
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

const courses = [
  {
    title: 'Python',
    description: "About Python"
  },
  {
    title: 'Javascript',
    description: "About Javascript"
  },
  {
    title: 'C#',
    description: "About C#"
  }
]

const { y } = useWindowScroll();

const isScrolled = computed(() => {
  return y.value > 30
})


</script>
<template>
  <div ref="block">
    <header
      :class="[isScrolled ? 'backdrop-blur-sm shadow-lg bg-gray-700/25 dark:bg-emerald-700/75' : 'backdrop-blur-none shadow-none bg-transparent']"
      class="text-white px-6 py-4 flex items-center justify-between fixed top-0 left-0 w-full z-50 transition-all duration-300 ">
      <h1 class="text-2xl font-bold select-none">MMU</h1>
      <nav class="flex items-center space-x-2">
        <site-tools mobile-dropdown-classes="top-15 right-10"></site-tools>
        <router-link :to="{ name: 'login-page' }"
          class="py-2 px-6 border-none text-base rounded-xl bg-emerald-500 dark:bg-emerald-600 text-white shadow-emerald-500/30 ring-0 hover:ring-4 ring-emerald-400/10 transition-all duration-300 ease-in-out">{{
            $t('login') }}</router-link>
      </nav>
    </header>
    <main class="bg-emerald-50 min-h-screen">
      <section
        class="fade-in-section flex flex-col items-center justify-center text-center p-12 bg-gradient-to-br from-emerald-300 via-emerald-400 to-emerald-500 dark:from-[#0a4141] dark:via-[#03412a] dark:to-[#061f1f] text-white h-screen transition duration-300 ease-in-out">
        <h1 class="text-3xl lg:text-5xl font-bold mb-4 select-none">{{ $t('mmuAbbr') }}
        </h1>
        <p class="text-base lg:text-xl max-w-2xl select-none">Izuchayte</p>
      </section>
      <section class="fade-in-section p-10 bg-white dark:bg-gray-800">
        <h2 class="text-3xl font-semibold text-emerald-500 dark:text-emerald-100 mb-6">
          Our courses
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="(course, index) in courses" :key="index"
            class="fade-in-block bg-emerald-100 dark:bg-emerald-900 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
            <h3 class="text-xl font-bold text-emerald-700 dark:text-emerald-50 mb-2">
              {{ course.title }}
            </h3>
            <p class="text-emerald-900 dark:text-emerald-300">{{ course.description }}</p>
          </div>
        </div>
      </section>
      <section class="fade-in-section p-10 bg-emerald-500 dark:bg-emerald-900 text-white text-center">
        <h2 class="text-3xl font-semibold mb-4">
          Start right now!
        </h2>
        <p class="mb-6">Join to our community!</p>
        <button
          class="bg-white text-emerald-600 px-6 py-3 rounded-full text-lg font-medium hover:bg-emerald-100 transition-colors duration-300 ease-in-out">Join</button>
      </section>
    </main>
  </div>
</template>

<style scoped>
main {
  scroll-behavior: smooth;
}

.fade-in-section {
  opacity: 0;
  transform: translateY(50px);
  animation: fadeInUp 1s ease-out forwards;
  animation-delay: 0.2s;
}

.fade-in-block {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.8s ease-out forwards;
}

.fade-in-block:nth-child(1) {
  animation-delay: 0.2s;
}

.fade-in-block:nth-child(2) {
  animation-delay: 0.4s;
}

.fade-in-block:nth-child(2) {
  animation-delay: 0.6s;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
