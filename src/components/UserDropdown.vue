<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth.store.js";
import { storeToRefs } from "pinia";
import Logo from "./Icons/Logo.vue";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const isOpen = ref(false);

function toggleMenu() {
  isOpen.value = !isOpen.value;
}

function closeMenu() {
  isOpen.value = false;
}

function onClickOutside(event) {
  if (!event.target.closest("#dropdown")) {
    closeMenu();
  }
}

window.addEventListener("click", onClickOutside);


</script>

<template>
  <div id="dropdown" class="relative inline-block text-left">
    <div>
      <button @click="toggleMenu" type="button" class="bg-none">
        <div class="hidden lg:flex items-center space-x-4">
          <div>
            <p class="m-0 text-gray-900 dark:text-gray-100 font-medium select-none">{{
              user.is_superuser ? $t('superuser') : authStore.user.manager_of }}</p>
            <p class="m-0 text-end text-gray-600 dark:text-gray-300 font-medium text-[0.8rem] select-none">{{
              user.is_superuser ? $t('superuser') : $t('educationCenter') }}</p>
          </div>
          <div
            class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
            <Logo class="w-8 -mt-2" />
          </div>
        </div>
      </button>
    </div>

    <transition name="fade-scale" @before-enter="el => (el.style.display = 'block')"
      @after-leave="el => (el.style.display = 'none')">
      <div v-show="isOpen"
        class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-[#112731] shadow-lg ring-1 ring-white dark:ring-gray-800 ring-opacity-5">
        <div class="py-1">
          <button @click="authStore.logout()"
            class="bg-none w-full flex items-center text-red-500 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-[#344750ef] transition duration-300 ease-in-out">
            <span class="px-2 select-none"><svg xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"
                viewBox="0 0 24 24" class="iconify iconify--heroicons w-5">
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9">
                </path>
              </svg></span>
            <span class="select-none">Ulgamdan çykmak</span>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* Tailwind-based transition */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.fade-scale-enter-to,
.fade-scale-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
