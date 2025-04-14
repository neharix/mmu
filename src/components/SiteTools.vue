<script setup>
import ButtonWithTooltip from "./ButtonWithTooltip.vue";
import useConfirmModal from "@/use/useModalWindow";
import { ref, watch } from "vue";
import { useUxStore } from "@/stores/ux.store";
import useTextUtils from "@/use/useUtils";



const { isModalOpen, openModal, header, context } = useConfirmModal();

const { capitalize } = useTextUtils()
const uxStore = useUxStore();

function submitModal(func) {
  func();
  isModalOpen.value = false;
}
const props = defineProps({
  isDark: Boolean,
  isMobile: Boolean,
  notifications: Boolean,
  class: String,
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


watch(isOpen, (newVal) => {
  console.log(newVal)
})

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}

function closeMenu() {
  isOpen.value = false;
}

function onClickOutside(event) {
  if (!event.target.closest("#dropdown")) {
    closeMenu();
  }
}

function changeMobileLanguage(lng) {
  uxStore.changeLanguage(lng);
  isMobileLngMenuOpen.value = false;
  isMobileMenuOpen.value = false;
}

window.addEventListener("click", onClickOutside);


const emit = defineEmits(["toggle-theme"]);

</script>
<template>
  <div :class="class">
    <div class="hidden lg:flex lg:items-center space-x-4">
      <div id="dropdown" class="relative inline-block text-left">
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
      <button-with-tooltip @clicked="emit('toggle-theme')" position-classes="right-20"
        :disable-tooltip="withoutTooltips" :text-value="isDark ? 'Ýagty tema' : 'Garaňky tema'"
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
      <button @click="toggleMobileMenu">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-6" fill="currentColor">
          <path
            d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336c44.2 0 80-35.8 80-80s-35.8-80-80-80s-80 35.8-80 80s35.8 80 80 80z" />
        </svg>
      </button>
      <transition name="fade-scale" @before-enter="el => (el.style.display = 'block')"
        @after-leave="el => (el.style.display = 'none')">
        <div v-show="isMobileMenuOpen" :class="[mobileDropdownClasses]"
          class="absolute overflow-y-auto space-y-4 p-4 z-10 mt-2 w-56 max-h-[40vh] origin-top-right rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#112731] shadow-lg ring-1 ring-white dark:ring-gray-800 ring-opacity-5">
          <button class="flex items-center space-x-2 w-full" @click="toggleMobileLngMenu">
            <svg class="w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
              <path
                d="M8 .5A7.76 7.76 0 0 0 0 8a7.76 7.76 0 0 0 8 7.5A7.76 7.76 0 0 0 16 8 7.76 7.76 0 0 0 8 .5zm6.71 6.8L13.48 7c-.25-.07-.27-.09-.29-.12-.15-.2-.32-.47-.48-.73 0-.09-.13-.23-.16-.31s.35-.6.51-.84a2.43 2.43 0 0 1 .59-.45 5.87 5.87 0 0 1 1.06 2.75zM8 1.75l-.09.17a.19.19 0 0 1 0-.1c0 .06-.15.15-.25.25l-.3.29a.85.85 0 0 0-.08 1.08h-.12a1.05 1.05 0 0 0-.81.42 1.27 1.27 0 0 0-.2 1.07V5a3 3 0 0 0-.43.11l-.24.08-.64.21a1.2 1.2 0 0 0-.81.8 1 1 0 0 0 .2.93 5.67 5.67 0 0 0 1.38 1.09 4.17 4.17 0 0 0 1.67.65h1.68a1.2 1.2 0 0 1 1.04.51.49.49 0 0 1 .13.43.77.77 0 0 1-.15.35 2.71 2.71 0 0 0-.95 1.61 11.11 11.11 0 0 1-.48 1.38c-.12.31-.23.61-.31.85a3.32 3.32 0 0 1-1-.08 3.28 3.28 0 0 0-.5-2.12 2.24 2.24 0 0 1-.53-1.42 2.11 2.11 0 0 0-1.47-2.29 10.81 10.81 0 0 1-2.9-2.64A6.79 6.79 0 0 1 8 1.75zM1.25 8a5.64 5.64 0 0 1 .12-1.16 10.29 10.29 0 0 0 2.94 2.42c.6.22.69.45.69 1.12a3.45 3.45 0 0 0 .86 2.27A3.05 3.05 0 0 1 6 14a6.35 6.35 0 0 1-4.75-6zm8.32 6.08c0-.15.12-.32.18-.48a10.2 10.2 0 0 0 .55-1.6 1.55 1.55 0 0 1 .54-.86 1.91 1.91 0 0 0 .57-1.3 1.71 1.71 0 0 0-.47-1.27 2.45 2.45 0 0 0-2-.9H7.35a4.77 4.77 0 0 1-2-1.11l.47-.16.27-.08a.79.79 0 0 1 .38-.07l.09.15a.64.64 0 0 0 .81.29.65.65 0 0 0 .34-.8v-.18c-.11-.3-.24-.72-.32-1A1.42 1.42 0 0 0 8.68 4a1 1 0 0 0-.18-1 3.44 3.44 0 0 0 .33-.34 1 1 0 0 0 .22-.8 6.93 6.93 0 0 1 3.73 1.8 3 3 0 0 0-.79.7 9.14 9.14 0 0 0-.64 1.09 1.46 1.46 0 0 0 .24 1.39c.18.31.38.61.56.86a1.58 1.58 0 0 0 1 .58c.22.06 1 .22 1.55.33a6.44 6.44 0 0 1-5.13 5.47z" />
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
          <button class="flex items-center space-x-2 w-full" @click="emit('toggle-theme')">
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
              {{ isDark ? 'Garaňky tema' : 'Ýagty tema' }}
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
