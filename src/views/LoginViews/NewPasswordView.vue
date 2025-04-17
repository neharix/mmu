<script setup>
import { Field, Form } from 'vee-validate';
import * as Yup from 'yup';
import TheSpinner from "@/components/TheSpinner.vue";

import { useAuthStore } from '@/stores/auth.store.js';
import SiteTools from "@/components/SiteTools.vue";
import { ref } from "vue";
import router from "@/router/index.js";
import TooltipMessage from '@/components/TooltipMessage.vue';
import { useUxStore } from '@/stores/ux.store';

const pwdStatus = ref(null);

const authStore = useAuthStore();
const uxStore = useUxStore();

const schema = Yup.object().shape({
  password: Yup.string().trim().required('validateError'),
  confirmedPassword: Yup.string().trim().required('validateError'),
});


function onSubmit(values, { setErrors }) {
  const { password, confirmedPassword } = values;
  if (password === confirmedPassword) {
    authStore.changePassword({ username: authStore.userForOtp, password }).then(() => {
      if (authStore.isPwdChangedSuccessfully) {
        authStore.resetAllOtpSessionFields();
        router.push({ name: 'login-page' });
      } else {
        pwdStatus.value = 'smthWrong';
      }
    })
  } else {
    pwdStatus.value = 'pwdNotSame';
  }
}

function togglePwdVisibility() {
  let pwdField = document.querySelector('#password');
  if (pwdField.getAttribute('type') === "password") {
    pwdField.setAttribute('type', 'text')
  } else {
    pwdField.setAttribute('type', 'password')
  }
}

function toggleRetypedPwdVisibility() {
  let pwdField = document.querySelector('#confirmPassword');
  if (pwdField.getAttribute('type') === "password") {
    pwdField.setAttribute('type', 'text')
  } else {
    pwdField.setAttribute('type', 'password')
  }
}


</script>

<template>
  <site-tools class="absolute top-5 right-5 md:right-20 text-white" :without-tooltips="true"
    mobile-dropdown-classes="top-8 right-0"></site-tools>
  <div class="w-full p-8 md:p-12 flex flex-col justify-center bg-white dark:bg-gray-800">
    <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">{{ $t('newPassword') }}</h2>
    <p class="text-gray-600 dark:text-gray-400 mb-6">{{ $t('newPasswordDesc') }}</p>
    <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }" class="space-y-10">
      <div class="relative">
        <Field name="password" type="password" id="password" class="peer text-input" :placeholder="$t('password')"
          :class="{ 'is-invalid': errors.password }" />
        <div class="absolute top-0 right-0 p-4" @click="togglePwdVisibility">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 text-gray-500" viewBox="0 0 24 24" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9ZM11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12Z"
              fill="currentColor" />
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M21.83 11.2807C19.542 7.15186 15.8122 5 12 5C8.18777 5 4.45796 7.15186 2.17003 11.2807C1.94637 11.6844 1.94361 12.1821 2.16029 12.5876C4.41183 16.8013 8.1628 19 12 19C15.8372 19 19.5882 16.8013 21.8397 12.5876C22.0564 12.1821 22.0536 11.6844 21.83 11.2807ZM12 17C9.06097 17 6.04052 15.3724 4.09173 11.9487C6.06862 8.59614 9.07319 7 12 7C14.9268 7 17.9314 8.59614 19.9083 11.9487C17.9595 15.3724 14.939 17 12 17Z"
              fill="currentColor" />
          </svg>
        </div>
        <tooltip-message position-classes="-bottom-10" :is-visible="!!errors.password" :only-smooth-text="true">
          <p class="text-red-500">{{ $t(errors.password, { fieldName: $t('password') }) }}</p>
        </tooltip-message>

        <label for="password" class="text-input-placeholder">
          {{ $t('password') }}
        </label>
      </div>
      <div class="relative">
        <Field name="confirmedPassword" type="password" id="confirmPassword" class="peer text-input"
          :placeholder="$t('confirmPassword')" :class="{ 'is-invalid': errors.confirmedPassword }" />
        <div class="absolute top-0 right-0 p-4" @click="toggleRetypedPwdVisibility">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 text-gray-500" viewBox="0 0 24 24" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9ZM11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12Z"
              fill="currentColor" />
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M21.83 11.2807C19.542 7.15186 15.8122 5 12 5C8.18777 5 4.45796 7.15186 2.17003 11.2807C1.94637 11.6844 1.94361 12.1821 2.16029 12.5876C4.41183 16.8013 8.1628 19 12 19C15.8372 19 19.5882 16.8013 21.8397 12.5876C22.0564 12.1821 22.0536 11.6844 21.83 11.2807ZM12 17C9.06097 17 6.04052 15.3724 4.09173 11.9487C6.06862 8.59614 9.07319 7 12 7C14.9268 7 17.9314 8.59614 19.9083 11.9487C17.9595 15.3724 14.939 17 12 17Z"
              fill="currentColor" />
          </svg>
        </div>
        <tooltip-message position-classes="-bottom-10" :is-visible="!!errors.confirmedPassword"
          :only-smooth-text="true">
          <p class="text-red-500">{{ $t(errors.confirmedPassword, { fieldName: $t('confirmPassword') }) }}</p>
        </tooltip-message>
        <label for="confirmPassword" class="text-input-placeholder">
          {{ $t('confirmPassword') }}
        </label>
      </div>
      <div v-if="pwdStatus" :class="{ '': !pwdStatus, '-my-4': pwdStatus }">
        <p class="text-center text-red-500">{{ $t(pwdStatus) }}</p>
      </div>
      <div class="flex flex-wrap justify-center mt-16">
        <button :disabled="isSubmitting"
          class="flex justify-center w-50 py-2 px-2 border-none text-base rounded-xl bg-emerald-500 dark:bg-emerald-600 text-white shadow-emerald-500/30 ring-0 hover:ring-4 ring-emerald-400/10 transition-all duration-300 ease-in-out">
          <the-spinner :class="{ hidden: !isSubmitting }"></the-spinner><span class="select-none"
            :class="{ hidden: isSubmitting }">{{ $t('confirm') }}</span>
        </button>
      </div>
    </Form>
  </div>

</template>

<style scoped></style>
