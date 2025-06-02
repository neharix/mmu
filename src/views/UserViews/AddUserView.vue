<script setup>
import TheSpinner from "@/components/TheSpinner.vue";
import TheBreadcrumb from "@/components/TheBreadcrumb.vue";
import { Field, Form } from "vee-validate";
import * as Yup from 'yup';
import router from "@/router/index.js";
import { ref, watch } from "vue";

const selectedRole = ref(0);

watch(selectedRole, (newVal) => {
  console.log(newVal);
})


const formSchema = Yup.object().shape({
  username: Yup.string().trim().required('validateError'),
  password: Yup.string().trim().required('validateError'),
  email: Yup.string().trim().email('emailTypeError').required('validateError'),
  role: Yup.number().required('validateError').notOneOf([0], 'selectRequiredError'),
});

function togglePwdVisibility() {
  let pwdField = document.querySelector('#password');
  if (pwdField.getAttribute('type') === "password") {
    pwdField.setAttribute('type', 'text')
  } else {
    pwdField.setAttribute('type', 'password')
  }
}

function onSubmit(values, { setErrors }) {
  const { name } = values;
  return usersStore.create({ name }).then(() => {
    router.push({ name: 'users-list' });
  })
    .catch(error => setErrors({ apiError: error }));
}

const roles = [
  { name: "director", id: 1 },
  { name: "personal", id: 2 },
  { name: "publisher", id: 3 },
]

const breadcrumbPaths = [
  { routeName: "users-list", name: "users" },
  { routeName: "add-user", name: "add" },
]

</script>
<template>
  <the-breadcrumb :paths="breadcrumbPaths">
  </the-breadcrumb>
  <div class="w-full rounded-lg shadow-lg p-4 bg-white dark:bg-[#112731]">
    <h3 class="text-xl font-bold mx-2 select-none">{{ $t('addUser') }}</h3>
    <Form :initial-values="{ role: 0 }" @submit="onSubmit" :validation-schema="formSchema"
      v-slot="{ errors, isSubmitting }" class="space-y-4 my-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        <div class="relative">
          <Field name="username" type="text" id="username" class="peer text-input" :placeholder="$t('username') + '*'"
            :class="{ 'is-invalid': errors.username }" />
          <p class="error-message" v-if="!!errors.username">{{ $t(errors.username, { fieldName: $t('username') }) }}</p>
          <label for="username" class="text-input-placeholder">
            {{ $t('username') + '*' }}
          </label>
        </div>
        <div class="relative">
          <Field name="password" type="password" id="password" :placeholder="$t('password') + '*'"
            class="peer text-input" :class="{ 'is-invalid': errors.password }" />
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
          <label for="password" class="text-input-placeholder">
            {{ $t('password') + '*' }}
          </label>
          <p class="error-message" v-if="!!errors.password">{{ $t(errors.password, { fieldName: $t('password') }) }}</p>
        </div>
        <div class="relative col-span-1 md:col-span-2">
          <Field name="email" type="email" id="email" class="peer text-input" :placeholder="$t('email') + '*'"
            :class="{ 'is-invalid': errors.email }" />
          <p class="error-message" v-if="!!errors.email">{{ $t(errors.email, { fieldName: $t('email') }) }}</p>
          <label for="email" class="text-input-placeholder">
            {{ $t('email') + '*' }}
          </label>
        </div>
        <div class="relative col-span-1 md:col-span-2">
          <Field name="role" as="select" id="role" class="peer text-input" v-model="selectedRole"
            :placeholder="$t('role') + '*'" :class="{ 'is-invalid': errors.role }">
            <option class="option" :value="0">{{ $t('unselected') }}</option>
            <option class="option" v-for="role in roles" :value="role.id">{{
              $t(role.name) }}
            </option>
          </Field>
          <p class="error-message" v-if="!!errors.role">{{ $t(errors.role, { fieldName: $t('role') }) }}</p>
          <label for="role" class="text-input-placeholder">
            {{ $t('role') + '*' }}
          </label>
        </div>
        <!-- <div class="relative col-span-1 md:col-span-2">
          <input name="educationCenter" as="select" id="role" class="peer text-input" v-model="selectedRole"
            :placeholder="$t('role')" :class="{ 'is-invalid': errors.role }">
            <option class="option" :value="0">{{ $t('unselected') }}</option>
            <option class="option" v-for="role in roles" :value="role.id">{{
              $t(role.name) }}
            </option>
          </Field>
          <p class="error-message" v-if="!!errors.role">{{ $t(errors.role, { fieldName: $t('role') }) }}</p>
          <label for="role" class="text-input-placeholder">
            {{ $t('role') }}
          </label>
        </div> -->
      </div>
      <div class="mt-10 flex flex-wrap justify-center md:justify-end lg:justify-end">
        <button :disabled="isSubmitting" class="flex w-50 justify-center btn-primary">
          <TheSpinner :class="{ hidden: !isSubmitting }" />
          <span :class="{ hidden: isSubmitting }">{{ $t('addAccept') }}</span>
        </button>
      </div>
      <div v-if="errors.apiError" class="text-center text-red-500 mt-3 mb-0 text-sm select-none">{{
        errors.apiError
      }}
      </div>
    </Form>
  </div>
</template>
