<script setup>
import ButtonWithTooltip from "./ButtonWithTooltip.vue";
import { ref, useTemplateRef } from "vue";
import { useUxStore } from "@/stores/ux.store";
import useTextUtils from "@/use/useUtils";
import { storeToRefs } from "pinia";
import { onClickOutside } from "@vueuse/core";




const { capitalize } = useTextUtils()
const uxStore = useUxStore();
const { isDark } = storeToRefs(uxStore)

const props = defineProps({
  isMobile: Boolean,
  class: String,
  isAbsolute: {
    type: Boolean,
    required: false,
    default: false,
  },
  withoutTooltips: {
    type: Boolean,
    required: false,
    default: false,
  },
  mobileDropdownClasses: String
});

const isOpen = ref(false);
const isMobileMenuOpen = ref(false);
const isMobileLngMenuOpen = ref(false);

function toggleMenu() {
  isOpen.value = !isOpen.value;
}

function toggleMobileLngMenu() {
  isMobileLngMenuOpen.value = !isMobileLngMenuOpen.value;
}


function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}


function changeMobileLanguage(lng) {
  uxStore.changeLanguage(lng);
  isMobileLngMenuOpen.value = false;
  isMobileMenuOpen.value = false;
}

// window.addEventListener("click", onClickOutside);

const dropdown = useTemplateRef('dropdown');

onClickOutside(dropdown, event => isOpen.value = false);


</script>
<template>
  <div :class="class">
    <div class="hidden lg:flex lg:items-center space-x-4">
      <div ref="dropdown" class="relative inline-block text-left">
        <div>
          <button @click="toggleMenu" type="button" class="bg-none">
            {{ capitalize($t('language')) }}
          </button>
        </div>

        <transition name="fade-scale" @before-enter="el => (el.style.display = 'block')"
          @after-leave="el => (el.style.display = 'none')">
          <div v-show="isOpen"
            class="absolute right-0 z-10 mt-2 w-24 origin-top-right rounded-md bg-white dark:bg-[#112731] shadow-lg ring-1 ring-white dark:ring-gray-800 ring-opacity-5">
            <div class="py-1">
              <button @click="uxStore.changeLanguage('tk')" v-if="$t('language') !== 'türkmen'"
                class="bg-none text-gray-800 dark:text-white w-full flex items-center select-none px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-[#344750ef] transition duration-300 ease-in-out">
                Türkmen
              </button>
              <button @click="uxStore.changeLanguage('en')" v-if="$t('language') !== 'english'"
                class="bg-none text-gray-800 dark:text-white w-full flex items-center select-none px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-[#344750ef] transition duration-300 ease-in-out">
                English
              </button>
              <button @click="uxStore.changeLanguage('ru')" v-if="$t('language') !== 'русский'"
                class="bg-none text-gray-800 dark:text-white w-full flex items-center select-none px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-[#344750ef] transition duration-300 ease-in-out">
                Русский
              </button>
            </div>
          </div>
        </transition>
      </div>
      <button-with-tooltip @clicked="uxStore.toggleTheme()" position-classes="right-20"
        :disable-tooltip="withoutTooltips" :text-value="isDark ? $t('lightTheme') : $t('darkTheme')"
        class="flex items-center p-2 dark:text-gray-100 rounded">
        <template #btn-content>
          <svg viewBox="0 0 24 24" class="w-6 h-6 m-0" :class="{ hidden: isDark }" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11 1C11 0.447715 11.4477 0 12 0C12.5523 0 13 0.447715 13 1V3C13 3.55228 12.5523 4 12 4C11.4477 4 11 3.55228 11 3V1Z"
              fill="currentColor" />
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12ZM8.06167 12C8.06167 14.1751 9.82492 15.9383 12 15.9383C14.1751 15.9383 15.9383 14.1751 15.9383 12C15.9383 9.82492 14.1751 8.06167 12 8.06167C9.82492 8.06167 8.06167 9.82492 8.06167 12Z"
              fill="currentColor" />
            <path
              d="M20.4853 3.51472C20.0947 3.12419 19.4616 3.12419 19.0711 3.51472L17.6568 4.92893C17.2663 5.31946 17.2663 5.95262 17.6568 6.34315C18.0474 6.73367 18.6805 6.73367 19.0711 6.34315L20.4853 4.92893C20.8758 4.53841 20.8758 3.90524 20.4853 3.51472Z"
              fill="currentColor" />
            <path
              d="M1 13C0.447715 13 0 12.5523 0 12C0 11.4477 0.447715 11 1 11H3C3.55228 11 4 11.4477 4 12C4 12.5523 3.55228 13 3 13H1Z"
              fill="currentColor" />
            <path
              d="M3.51472 3.51472C3.1242 3.90524 3.1242 4.53841 3.51472 4.92893L4.92894 6.34315C5.31946 6.73367 5.95263 6.73367 6.34315 6.34315C6.73368 5.95262 6.73368 5.31946 6.34315 4.92893L4.92894 3.51472C4.53841 3.12419 3.90525 3.12419 3.51472 3.51472Z"
              fill="currentColor" />
            <path
              d="M11 21C11 20.4477 11.4477 20 12 20C12.5523 20 13 20.4477 13 21V23C13 23.5523 12.5523 24 12 24C11.4477 24 11 23.5523 11 23V21Z"
              fill="currentColor" />
            <path
              d="M6.34315 17.6569C5.95263 17.2663 5.31946 17.2663 4.92894 17.6569L3.51473 19.0711C3.1242 19.4616 3.1242 20.0948 3.51473 20.4853C3.90525 20.8758 4.53842 20.8758 4.92894 20.4853L6.34315 19.0711C6.73368 18.6805 6.73368 18.0474 6.34315 17.6569Z"
              fill="currentColor" />
            <path
              d="M21 13C20.4477 13 20 12.5523 20 12C20 11.4477 20.4477 11 21 11H23C23.5523 11 24 11.4477 24 12C24 12.5523 23.5523 13 23 13H21Z"
              fill="currentColor" />
            <path
              d="M17.6568 17.6569C17.2663 18.0474 17.2663 18.6805 17.6568 19.0711L19.0711 20.4853C19.4616 20.8758 20.0947 20.8758 20.4853 20.4853C20.8758 20.0948 20.8758 19.4616 20.4853 19.0711L19.0711 17.6569C18.6805 17.2663 18.0474 17.2663 17.6568 17.6569Z"
              fill="currentColor" />
          </svg>
          <svg viewBox="0 0 24 24" class="w-6 h-6 m-0" :class="{ hidden: !isDark }" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13 6V3M18.5 12V7M14.5 4.5H11.5M21 9.5H16M15.5548 16.8151C16.7829 16.8151 17.9493 16.5506 19 16.0754C17.6867 18.9794 14.7642 21 11.3698 21C6.74731 21 3 17.2527 3 12.6302C3 9.23576 5.02061 6.31331 7.92462 5C7.44944 6.05072 7.18492 7.21708 7.18492 8.44523C7.18492 13.0678 10.9322 16.8151 15.5548 16.8151Z"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </template>
      </button-with-tooltip>

    </div>
    <div class="flex items-center space-x-2 lg:hidden">
      <button @click="toggleMobileMenu" ref="mobileDropdown">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-6" fill="currentColor">
          <path
            d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336c44.2 0 80-35.8 80-80s-35.8-80-80-80s-80 35.8-80 80s35.8 80 80 80z" />
        </svg>
      </button>
      <transition name="fade-scale" @before-enter="el => (el.style.display = 'block')"
        @after-leave="el => (el.style.display = 'none')">
        <div v-show="isMobileMenuOpen" :class="[mobileDropdownClasses]"
          class="absolute overflow-y-auto space-y-4 p-4 z-10 mt-2 w-56 max-h-[40vh] origin-top-right rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#112731] shadow-lg ring-1 ring-white dark:ring-gray-800 ring-opacity-5">
          <button class="flex items-center space-x-2 w-full text-gray-800 dark:text-white" @click="toggleMobileLngMenu">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true"
              role="img" viewBox="0 0 24 24" class="iconify iconify--lucide w-6">
              <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                <path
                  d="M21.54 15H17a2 2 0 0 0-2 2v4.54M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05">
                </path>
                <circle cx="12" cy="12" r="10"></circle>
              </g>
            </svg>
            <p>
              {{ capitalize($t('language')) }}
            </p>
          </button>
          <transition name="fade-scale" @before-enter="el => (el.style.display = 'block')"
            @after-leave="el => (el.style.display = 'none')">
            <div v-show="isMobileLngMenuOpen" class="bg-white dark:bg-[#112731] w-full">
              <div class="py-1">
                <button @click="changeMobileLanguage('tk')" v-if="$t('language') !== 'türkmen'"
                  class="bg-none text-gray-800 dark:text-white w-full flex items-center select-none px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-[#344750ef] transition duration-300 ease-in-out">
                  Türkmen
                </button>
                <button @click="changeMobileLanguage('en')" v-if="$t('language') !== 'english'"
                  class="bg-none text-gray-800 dark:text-white w-full flex items-center select-none px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-[#344750ef] transition duration-300 ease-in-out">
                  English
                </button>
                <button @click="changeMobileLanguage('ru')" v-if="$t('language') !== 'русский'"
                  class="bg-none text-gray-800 dark:text-white w-full flex items-center select-none px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-[#344750ef] transition duration-300 ease-in-out">
                  Русский
                </button>
              </div>
            </div>
          </transition>
          <button class="flex items-center space-x-2 w-full text-gray-800 dark:text-white"
            @click="uxStore.toggleTheme()">
            <svg viewBox="0 0 24 24" class="w-6 h-6" :class="{ hidden: isDark }" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11 1C11 0.447715 11.4477 0 12 0C12.5523 0 13 0.447715 13 1V3C13 3.55228 12.5523 4 12 4C11.4477 4 11 3.55228 11 3V1Z"
                fill="currentColor" />
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12ZM8.06167 12C8.06167 14.1751 9.82492 15.9383 12 15.9383C14.1751 15.9383 15.9383 14.1751 15.9383 12C15.9383 9.82492 14.1751 8.06167 12 8.06167C9.82492 8.06167 8.06167 9.82492 8.06167 12Z"
                fill="currentColor" />
              <path
                d="M20.4853 3.51472C20.0947 3.12419 19.4616 3.12419 19.0711 3.51472L17.6568 4.92893C17.2663 5.31946 17.2663 5.95262 17.6568 6.34315C18.0474 6.73367 18.6805 6.73367 19.0711 6.34315L20.4853 4.92893C20.8758 4.53841 20.8758 3.90524 20.4853 3.51472Z"
                fill="currentColor" />
              <path
                d="M1 13C0.447715 13 0 12.5523 0 12C0 11.4477 0.447715 11 1 11H3C3.55228 11 4 11.4477 4 12C4 12.5523 3.55228 13 3 13H1Z"
                fill="currentColor" />
              <path
                d="M3.51472 3.51472C3.1242 3.90524 3.1242 4.53841 3.51472 4.92893L4.92894 6.34315C5.31946 6.73367 5.95263 6.73367 6.34315 6.34315C6.73368 5.95262 6.73368 5.31946 6.34315 4.92893L4.92894 3.51472C4.53841 3.12419 3.90525 3.12419 3.51472 3.51472Z"
                fill="currentColor" />
              <path
                d="M11 21C11 20.4477 11.4477 20 12 20C12.5523 20 13 20.4477 13 21V23C13 23.5523 12.5523 24 12 24C11.4477 24 11 23.5523 11 23V21Z"
                fill="currentColor" />
              <path
                d="M6.34315 17.6569C5.95263 17.2663 5.31946 17.2663 4.92894 17.6569L3.51473 19.0711C3.1242 19.4616 3.1242 20.0948 3.51473 20.4853C3.90525 20.8758 4.53842 20.8758 4.92894 20.4853L6.34315 19.0711C6.73368 18.6805 6.73368 18.0474 6.34315 17.6569Z"
                fill="currentColor" />
              <path
                d="M21 13C20.4477 13 20 12.5523 20 12C20 11.4477 20.4477 11 21 11H23C23.5523 11 24 11.4477 24 12C24 12.5523 23.5523 13 23 13H21Z"
                fill="currentColor" />
              <path
                d="M17.6568 17.6569C17.2663 18.0474 17.2663 18.6805 17.6568 19.0711L19.0711 20.4853C19.4616 20.8758 20.0947 20.8758 20.4853 20.4853C20.8758 20.0948 20.8758 19.4616 20.4853 19.0711L19.0711 17.6569C18.6805 17.2663 18.0474 17.2663 17.6568 17.6569Z"
                fill="currentColor" />
            </svg>
            <svg viewBox="0 0 24 24" class="w-6 h-6" :class="{ hidden: !isDark }" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13 6V3M18.5 12V7M14.5 4.5H11.5M21 9.5H16M15.5548 16.8151C16.7829 16.8151 17.9493 16.5506 19 16.0754C17.6867 18.9794 14.7642 21 11.3698 21C6.74731 21 3 17.2527 3 12.6302C3 9.23576 5.02061 6.31331 7.92462 5C7.44944 6.05072 7.18492 7.21708 7.18492 8.44523C7.18492 13.0678 10.9322 16.8151 15.5548 16.8151Z"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p>
              {{ isDark ? $t("darkTheme") : $t("lightTheme") }}
            </p>
          </button>

        </div>
      </transition>
    </div>

  </div>
</template>
<style scoped>
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
