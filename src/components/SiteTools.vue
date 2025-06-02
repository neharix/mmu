<script setup>
import { onMounted, ref, useTemplateRef } from "vue";
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

const lightThemeBtn = ref('swap-off');
const darkThemeBtn = ref('swap-on');

onMounted(() => {
  if (uxStore.theme === 'dark') {
    lightThemeBtn.value = 'swap-on';
    darkThemeBtn.value = 'swap-off';
  }
})


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
      <label class="swap swap-rotate">
        <input type="checkbox" class="theme-controller" @change="uxStore.toggleTheme()" />
        <svg class="h-6 w-6 fill-current" :class="[lightThemeBtn]" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24">
          <path
            d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
        </svg>

        <svg class="h-6 w-6 fill-current" :class="[darkThemeBtn]" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24">
          <path
            d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
        </svg>
      </label>
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
          <div class="flex">
            <label class="swap swap-rotate">
              <input type="checkbox" class="theme-controller" @change="uxStore.toggleTheme()"
                id="mobile-theme-toggler" />
              <svg class="h-6 w-6 fill-current" :class="[lightThemeBtn]" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <path
                  d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              <svg class="h-6 w-6 fill-current" :class="[darkThemeBtn]" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <path
                  d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
              <label for="mobile-theme-toggler" class="ml-8">
                {{ isDark ? $t("darkTheme") : $t("lightTheme") }}
              </label>
            </label>
          </div>

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
