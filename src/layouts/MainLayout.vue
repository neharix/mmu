<script setup>
import { onBeforeMount, onMounted, ref, shallowRef, watch } from "vue";
import SiteTools from "@/components/SiteTools.vue";
import { useAuthStore } from '@/stores/auth.store.js';
import UserDropdown from "@/components/UserDropdown.vue";
import { storeToRefs } from "pinia";
import RootSidebar from "@/components/Sidebars/RootSidebar.vue";
import UserSidebar from "@/components/Sidebars/UserSidebar.vue";
import EmptySidebar from "@/components/Sidebars/EmptySidebar.vue";
import { useUxStore } from "@/stores/ux.store.js";
import TheSpinner from "@/components/TheSpinner.vue";
import Logo from "@/components/Icons/Logo.vue";
import { Icon } from "@iconify/vue";

const uxStore = useUxStore();
const { sidebarExpanded, sidebarHover } = storeToRefs(uxStore);

const authStore = useAuthStore();


const { user, role } = storeToRefs(authStore);
const sidebar = shallowRef(EmptySidebar);
const showSidebar = ref(false);
const isDark = ref(null)
const year = ref(new Date().getFullYear())


function toggleTheme() {
  const html = document.documentElement;
  const prevTheme = html.classList.contains('dark') ? 'dark' : 'light'
  html.classList.remove(prevTheme)
  html.classList.add(prevTheme === "dark" ? "light" : "dark")

  localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
  const theme = localStorage.getItem("theme");

  html.classList.add(theme)
  html.classList.remove(theme === "dark" ? "light" : "dark")
  isDark.value = theme === "dark";

}


if (role.value === "root") {
  sidebar.value = RootSidebar;
} else if (role.value === "user") {
  sidebar.value = UserSidebar;
} else if (role.value === "empty") {
  sidebar.value = EmptySidebar;
}

watch(role, (newValue, oldValue) => {
  if (newValue === "root") {
    sidebar.value = RootSidebar;
  } else if (newValue === "user") {
    sidebar.value = UserSidebar;
  } else if (newValue === "empty") {
    sidebar.value = EmptySidebar;
  }
})

onBeforeMount(() => {
  if (!(document.body.classList.contains("main-layout"))) {
    document.body.className = "";
    document.querySelector("#app").className = "flex h-screen";
    document.body.classList = [];
    document.body.classList.add("main-layout", "font-montserrat", "antialiased", "bg-gray-100", "relative", "w-screen");
  }
})

onMounted(() => {
  const theme = localStorage.getItem("theme")
  if (theme !== null) {
    document.querySelector("html").setAttribute("class", theme)
    isDark.value = theme === "dark"

  } else {
    localStorage.setItem("theme", "light")
    document.querySelector("html").setAttribute("class", "light")
    isDark.value = false
  }

})
</script>
<template>
  <div id="sidebar" @mouseover="uxStore.mouseOverSidebar()" @mouseleave="uxStore.mouseLeaveSidebar()"
    :class="{ '-translate-x-full': showSidebar === false, 'w-64': sidebarExpanded, 'w-25': !sidebarExpanded }"
    class="fixed z-30 shadow-md inset-y-0 left-0 bg-white/90 lg:bg-white text-gray-800 dark:text-white dark:bg-[#112731ef] lg:dark:bg-[#112731] flex flex-col transform duration-200 ease-out lg:translate-x-0 transition-all">
    <div class="flex items-center justify-between py-8 px-4 lg:hidden">
      <div class="w-10 h-10 flex justify-center items-center rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
        <Logo class="-my-4" />
      </div>
      <div>
        <p class="m-0 text-gray-900 dark:text-gray-100 font-medium select-none" v-if="user">
          {{ user.is_superuser ? $t('superuser') : user.manager_of }}
        </p>
        <p class="m-0 text-gray-600 dark:text-gray-300 font-medium text-[0.8rem] select-none" v-if="user">
          {{ user.is_superuser ? $t('superuser') : $t('educationCenter') }}</p>
      </div>
      <div>
        <button @click="authStore.logout()" class="bg-none w-full flex items-center text-red-500 text-sm rounded-2xl">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true"
            role="img" viewBox="0 0 24 24" class="iconify iconify--heroicons w-5">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9">
            </path>
          </svg>
        </button>
      </div>
    </div>
    <button @click="uxStore.toggleSidebar" class="hidden lg:flex lg:justify-center mt-4">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"
        viewBox="0 0 24 24" :class="{ '-rotate-90': uxStore.sidebarExpanded }"
        class="iconify iconify--lucide w-6 transition-all duration-300 ease-out">
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="m7 6l5 5l5-5M7 13l5 5l5-5"></path>
      </svg>

    </button>
    <component :is="sidebar"></component>


  </div>
  <!-- Overlay -->
  <div id="overlay" :class="{ hidden: showSidebar === false }"
    class="fixed inset-0 z-10 bg-black/50 lg:hidden transition-colors duration-200 ease-out"
    @click="showSidebar = !showSidebar"></div>
  <!-- Main Content -->
  <div class="flex-1 flex flex-col dark:bg-[#122427] bg-gray-100 transition-all duration-200 ease-out"
    :class="{ 'lg:pl-64': sidebarExpanded, 'lg:pl-24': !sidebarExpanded }">
    <!-- Navbar -->
    <div :class="showSidebar ? 'bg-white/25 dark:bg-[#1127313b]' : 'bg-white/90 dark:bg-[#112731ef]'"
      class=" lg:bg-white text-gray-800 dark:text-white lg:dark:bg-[#112731] shadow-md dark:shadow-lg rounded-2xl sticky top-0 z-10 flex justify-between items-center p-4 lg:m-4 lg:mt-4 m-4 lg:mb-0 mb-0">
      <button id="menuButton" class="lg:hidden px-4 py-2 rounded" @click="showSidebar = !showSidebar">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
      <router-link to="/workspace">
        <div class="text-xl font-semibold flex items-center">
          <Logo class="w-18 -mt-2 mx-2" />
        </div>
      </router-link>

      <div class="flex items-center">
        <the-spinner class="hidden lg:block" v-if="uxStore.isLoading"></the-spinner>
        <site-tools class="mx-3" mobile-dropdown-classes="top-16 right-0"></site-tools>
        <user-dropdown v-if="user"></user-dropdown>
      </div>
    </div>
    <!-- Page Content -->
    <div class="flex-1 p-6 text-gray-800 dark:text-gray-100 overflow-y-auto lg:w-full w-screen">
      <router-view></router-view>
      <div class="mt-8">
        <p class="select-none lg:text-end md:text-end text-center text-[0.75rem] text-gray-500 dark:text-gray-400">
          {{ $t('rights', { year }) }}
        </p>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
