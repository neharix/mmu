<script setup>
import { Field, Form } from 'vee-validate';
import * as Yup from 'yup';
import TheSpinner from "@/components/TheSpinner.vue";

import { useAuthStore } from '@/stores/auth.store.js';
import SiteTools from "@/components/SiteTools.vue";
import { onBeforeMount, onMounted, ref } from "vue";
import router from "@/router/index.js";
import { useDashboardStore } from '@/stores/api.store';
import TooltipMessage from '@/components/TooltipMessage.vue';
import { storeToRefs } from 'pinia';
import { onBeforeRouteUpdate } from 'vue-router';

const dashboardStore = useDashboardStore();
const authStore = useAuthStore();
const isPwdVisible = ref(false);

const { loginStatus } = storeToRefs(authStore);

const schema = Yup.object().shape({
  username: Yup.string().trim().required('validateError'),
  password: Yup.string().required('validateError'),
});

function onSubmit(values, { setErrors }) {
  const { username, password } = values;
  loginStatus.value = null;
  return authStore.login({ username, password }).then(() => {
    router.push({ name: 'workspace-view' });
  })
    .catch(error => setErrors({ apiError: error }));
}

function togglePwdVisibility() {
  let pwdField = document.querySelector('#password');
  if (pwdField.getAttribute('type') === "password") {
    pwdField.setAttribute('type', 'text');
    isPwdVisible.value = true;
  } else {
    pwdField.setAttribute('type', 'password')
    isPwdVisible.value = false;
  }
}


onMounted(() => {
  dashboardStore.clearData();
})

onBeforeMount(() => {
  if (authStore.isAuthenticated) {
    router.push({ name: 'workspace-view' });
  } else {
    try {
      authStore.fetchUser().then(() => {
        router.push({ name: 'workspace-view' });
      });
    } catch { }
  }
})

</script>

<template>
  <site-tools class="absolute top-5 right-5 md:right-20 text-white" :without-tooltips="true"
    mobile-dropdown-classes="top-8 right-0"></site-tools>
  <div class="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white dark:bg-gray-800">
    <div class="flex justify-between">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">{{ $t('hello') }}</h2>
      <router-link :to="{ name: 'main' }">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"
          viewBox="0 0 24 24" class="iconify iconify--lucide w-6">
          <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
            <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
            <path
              d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z">
            </path>
          </g>
        </svg>
      </router-link>
    </div>
    <p class="text-gray-600 dark:text-gray-400 mb-6">{{ $t('signIn') }}</p>
    <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }" class="space-y-10">
      <div class="relative">
        <Field name="username" type="text" id="username" class="peer text-input" :placeholder="$t('username')"
          :class="{ 'is-invalid': errors.username }" />
        <tooltip-message position-classes="-bottom-10" :is-visible="!!errors.username" :only-smooth-text="true">
          <p class="text-red-500">{{ $t(errors.username, { fieldName: $t('username') }) }}</p>
        </tooltip-message>
        <label for="username" class="text-input-placeholder">
          {{ $t('username') }}
        </label>
      </div>
      <div class="relative">
        <Field name="password" type="password" id="password" :placeholder="$t('password')" class="peer text-input"
          :class="{ 'is-invalid': errors.password }" />
        <div class="absolute top-0 right-0 p-4" @click="togglePwdVisibility">
          <svg v-if="isPwdVisible" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true" role="img" viewBox="0 0 24 24" class="iconify iconify--lucide w-5 text-gray-500">
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
              <path
                d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575a1 1 0 0 1 0 .696a10.8 10.8 0 0 1-1.444 2.49m-6.41-.679a3 3 0 0 1-4.242-4.242">
              </path>
              <path
                d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 4.446-5.143M2 2l20 20">
              </path>
            </g>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true"
            role="img" viewBox="0 0 24 24" class="iconify iconify--lucide w-5 text-gray-500">
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
              <path
                d="M2.062 12.348a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 19.876 0a1 1 0 0 1 0 .696a10.75 10.75 0 0 1-19.876 0">
              </path>
              <circle cx="12" cy="12" r="3"></circle>
            </g>
          </svg>
        </div>
        <label for="password" class="text-input-placeholder">
          {{ $t('password') }}
        </label>
        <tooltip-message position-classes="-bottom-10" :is-visible="!!errors.password" :only-smooth-text="true">
          <p class="text-red-500">{{ $t(errors.password, { fieldName: $t('password') }) }}</p>
        </tooltip-message>

      </div>
      <div class="flex flex-wrap justify-center mt-16">
        <button :disabled="isSubmitting"
          class="flex justify-center w-50 py-2 px-2 border-none text-base rounded-xl bg-emerald-500 dark:bg-emerald-600 text-white shadow-emerald-500/30 ring-0 hover:ring-4 ring-emerald-400/10 transition-all duration-300 ease-in-out">
          <the-spinner :class="{ hidden: !isSubmitting }"></the-spinner><span class="select-none"
            :class="{ hidden: isSubmitting }">{{ $t('login') }}</span>
        </button>
      </div>
      <div class="-mt-4">
        <router-link :to="{ name: 'reset-password' }" class="w-full">
          <p class="text-center text-emerald-500 dark:text-emerald-600 underline">{{ $t('forgotPassword')
          }}</p>
        </router-link>
      </div>
      <div v-if="loginStatus" class="text-center text-red-500 mt-3 mb-0 text-sm">{{ loginStatus }}</div>
    </Form>
  </div>
  <div
    class="hidden md:flex w-full md:w-1/2 bg-gradient-to-br from-emerald-500 to-emerald-700 dark:from-emerald-700 dark:to-emerald-900 text-white p-10 items-center justify-center text-center transition duration-300 ease-in-out">
    <div>
      <h2 class="text-2xl font-bold mb-4">MMU</h2>
      <p class="text-white text-sm leading-relaxed">
        {{ $t('mmuAbbr') }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
