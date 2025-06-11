<script setup>

import TheSpinner from "@/components/TheSpinner.vue";
import TheBreadcrumb from "@/components/TheBreadcrumb.vue";
import { Field, Form } from "vee-validate";
import * as Yup from 'yup';
import router from "@/router/index.js";
import { onMounted, ref } from "vue";
import { useAchievementsStore } from "@/stores/api.store";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

const achievementsStore = useAchievementsStore();
const { achievement } = storeToRefs(achievementsStore);

const route = useRoute();

const schema = Yup.object().shape({
  name: Yup.string().trim().required("validateError"),
});

const aName = ref("");


function onSubmit(values, { setErrors }) {
  const { name } = values;
  return achievementsStore.put(route.params.id, { name }).then(() => {
    router.push({ name: 'achievements-list' });
  })
    .catch(error => setErrors({ apiError: error }));
}

onMounted(async () => {
  await achievementsStore.get(route.params.id).then(() => {
    aName.value = achievement.value.name;

  });
})

const breadcrumbPaths = [
  { name: "achievements", routeName: "achievements-list" },
  { name: "edit", routeName: "edit-achievement" },
]

</script>

<template>
  <the-breadcrumb :paths="breadcrumbPaths">
  </the-breadcrumb>
  <div class="w-full rounded-lg shadow-lg p-4 bg-white dark:bg-[#112731]">
    <h3 class="text-xl font-bold mx-2 select-none">{{ $t('editAchievement') }}</h3>
    <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }" class="space-y-4 my-4">
      <div class="grid grid-cols-1 gap-x-8 gap-y-4">
        <div class="relative">
          <Field name="name" type="text" id="name" class="peer text-input" v-model="aName"
            :disabled="achievementsStore.isLoading" :placeholder="$t('name') + '*'"
            :class="{ 'is-invalid': errors.name }" />
          <p class="error-message" v-if="!!errors.name">{{ $t(errors.name, { fieldName: $t('name') }) }}</p>
          <label for="name" class="text-input-placeholder">
            {{ $t('name') + '*' }}
          </label>
        </div>
      </div>
      <div class="mt-10 flex flex-wrap justify-center md:justify-end lg:justify-end">
        <button :disabled="isSubmitting || achievementsStore.isLoading" class="flex w-50 justify-center btn-primary">
          <TheSpinner :class="{ hidden: !isSubmitting || !achievementsStore.isLoading }" />
          <span :class="{ hidden: isSubmitting || achievementsStore.isLoading }">{{ $t('edit') }}</span>
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
