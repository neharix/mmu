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

const authStore = useAuthStore();
const uxStore = useUxStore();


const userStatus = ref(null);

const schema = Yup.object().shape({
  username: Yup.string().trim().required('validateError'),
});


function onSubmit(values, { setErrors }) {
  const { username } = values;
  userStatus.value = null;
  return authStore.tryToGetOtpForUser(username).then(() => {
    if (authStore.isOtpAvailable) {
      router.push({ name: 'otp-confirmation' });
    } else {
      userStatus.value = 'userNotFound';
    }
  })
    .catch(error => setErrors({ apiError: error }));
}

</script>

<template>
  <site-tools class="absolute top-5 right-5 md:right-20 text-white" :without-tooltips="true"
    mobile-dropdown-classes="top-8 right-0"></site-tools>
  <div class="w-full p-8 md:p-12 flex flex-col justify-center bg-white dark:bg-gray-800">
    <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">{{ $t('reinstatePassword') }}</h2>
    <p class="text-gray-600 dark:text-gray-400 mb-6">{{ $t('enterUsername') }}</p>
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
      <div v-if="userStatus" :class="{ '-my-4': userStatus }">
        <p class="text-center text-red-500">{{ $t(userStatus) }}</p>
      </div>
      <div class="flex flex-wrap justify-center mt-8">
        <button :disabled="isSubmitting"
          class="flex justify-center w-50 py-2 px-2 border-none text-base rounded-xl bg-emerald-500 dark:bg-emerald-600 text-white shadow-emerald-500/30 ring-0 hover:ring-4 ring-emerald-400/10 transition-all duration-300 ease-in-out">
          <the-spinner :class="{ hidden: !isSubmitting }"></the-spinner><span class="select-none"
            :class="{ hidden: isSubmitting }">{{ $t('getOtp') }}</span>
        </button>
      </div>
    </Form>
  </div>

</template>

<style scoped></style>
