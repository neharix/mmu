<script setup>

import TheSpinner from "@/components/TheSpinner.vue";
import TheBreadcrumb from "@/components/TheBreadcrumb.vue";
import { Field, Form } from "vee-validate";
import * as Yup from 'yup';
import router from "@/router/index.js";
import { onMounted, ref } from "vue";
import { useSpecializationsStore } from "@/stores/api.store";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

const specializationsStore = useSpecializationsStore();
const { specialization } = storeToRefs(specializationsStore);

const route = useRoute();

const schema = Yup.object().shape({
  name: Yup.string().trim().required("validateError"),
});

const sName = ref("");


function onSubmit(values, { setErrors }) {
  const { name } = values;
  return specializationsStore.put(route.params.id, { name }).then(() => {
    router.push({ name: 'specializations-list' });
  })
    .catch(error => setErrors({ apiError: error }));
}

onMounted(async () => {
  await specializationsStore.get(route.params.id).then(() => {
    sName.value = specialization.value.name;

  });
})

const breadcrumbPaths = [
  { name: "specializations", routeName: "specializations-list" },
  { name: "edit", routeName: "edit-specialization" },
]

</script>

<template>
  <the-breadcrumb :paths="breadcrumbPaths">
  </the-breadcrumb>
  <div class="w-full rounded-lg shadow-lg p-4 bg-white dark:bg-[#112731]">
    <h3 class="text-xl font-bold mx-2 select-none">{{ $t('editSpecialization') }}</h3>
    <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }" class="space-y-4 my-4">
      <div class="grid grid-cols-1 gap-x-8 gap-y-4">
        <div class="relative">
          <Field name="name" type="text" id="name" class="peer text-input" v-model="sName"
            :disabled="specializationsStore.isLoading" :placeholder="$t('name') + '*'"
            :class="{ 'is-invalid': errors.name }" />
          <p class="error-message" v-if="!!errors.name">{{ $t(errors.name, { fieldName: $t('name') }) }}</p>
          <label for="name" class="text-input-placeholder">
            {{ $t('name') + '*' }}
          </label>
        </div>
      </div>
      <div class="mt-10 flex flex-wrap justify-center md:justify-end lg:justify-end">
        <button :disabled="isSubmitting || specializationsStore.isLoading" class="flex w-50 justify-center btn-primary">
          <TheSpinner :class="{ hidden: !isSubmitting || !specializationsStore.isLoading }" />
          <span :class="{ hidden: isSubmitting || specializationsStore.isLoading }">{{ $t('edit') }}</span>
        </button>
      </div>
      <div v-if="errors.apiError" class="text-center text-red-500 mt-3 mb-0 text-sm select-none">{{
        errors.apiError
        }}
      </div>
    </Form>
  </div>
</template>
<style scoped></style>
