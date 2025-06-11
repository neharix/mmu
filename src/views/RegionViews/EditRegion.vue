<script setup>

import TheSpinner from "@/components/TheSpinner.vue";
import TheBreadcrumb from "@/components/TheBreadcrumb.vue";
import { Field, Form } from "vee-validate";
import * as Yup from 'yup';
import router from "@/router/index.js";
import { onMounted, ref } from "vue";
import { useCountriesStore, useEducationCentersStore, useRegionsStore } from "@/stores/api.store";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

const educationCentersStore = useEducationCentersStore();
const { educationCenter } = storeToRefs(educationCentersStore);

const route = useRoute();

const regionsStore = useRegionsStore();
const countriesStore = useCountriesStore()
const { regions } = storeToRefs(regionsStore);
const { countries } = storeToRefs(countriesStore);

const schema = Yup.object().shape({
  name: Yup.string().trim().required("validateError"),
  phone_number: Yup.string().trim().required("validateError"),
  address: Yup.string().trim().required("validateError"),

  region: Yup.number().required('validateError').notOneOf([0], 'selectRequiredError'),
  country: Yup.number().required('validateError').notOneOf([0], 'selectRequiredError'),

  buildings_count: Yup.number().integer('integerError').min(0, 'minNumberError').typeError('numberError'),
  capacity: Yup.number().integer('integerError').min(0, 'minNumberError').typeError('numberError'),
  rooms_count: Yup.number().integer('integerError').min(0, 'minNumberError').typeError('numberError'),
  books_count: Yup.number().integer('integerError').min(0, 'minNumberError').typeError('numberError'),

  lng: Yup.number().typeError('numberError'),
  lat: Yup.number().typeError('numberError'),
});

const selectedRegion = ref(0);
const selectedCountry = ref(0);

const ecName = ref("");
const ecPhoneNumber = ref("");
const ecAddress = ref("");
const ecBuildingsCount = ref(0);
const ecCapacity = ref(0);
const ecRoomsCount = ref(0);
const ecBooksCount = ref(0);
const ecLng = ref(0);
const ecLat = ref(0);


function onSubmit(values, { setErrors }) {
  const { name, phone_number, address, region, country, buildings_count, capacity, rooms_count, books_count, lng, lat } = values;
  return educationCentersStore.put(route.params.id, { name, phone_number, address, region, country, buildings_count, capacity, rooms_count, books_count, lng, lat }).then(() => {
    router.push({ name: 'education-centers-list' });
  })
    .catch(error => setErrors({ apiError: error }));
}

onMounted(async () => {
  await educationCentersStore.get(route.params.id).then(() => {
    ecName.value = educationCenter.value.name;
    ecPhoneNumber.value = educationCenter.value.phone_number;
    ecAddress.value = educationCenter.value.address;
    selectedCountry.value = educationCenter.value.country;
    selectedRegion.value = educationCenter.value.region;
    ecBuildingsCount.value = educationCenter.value.buildings_count;
    ecCapacity.value = educationCenter.value.capacity;
    ecRoomsCount.value = educationCenter.value.rooms_count;
    ecBooksCount.value = educationCenter.value.books_count;
    ecLng.value = educationCenter.value.lng ? educationCenter.value.lng : 0;
    ecLat.value = educationCenter.value.lat ? educationCenter.value.lat : 0;
  });
  await regionsStore.getAll();
  await countriesStore.getAll();
})

const breadcrumbPaths = [
  { name: "educationCenters", routeName: "education-centers-list" },
  { name: "edit", routeName: "edit-education-center" },
]

</script>

<template>
  <the-breadcrumb :paths="breadcrumbPaths">
  </the-breadcrumb>
  <div class="w-full rounded-lg shadow-lg p-4 bg-white dark:bg-[#112731]">
    <h3 class="text-xl font-bold mx-2 select-none">{{ $t('editEducationCenter') }}</h3>
    <Form
      :initial-values="{ region: 0, country: 0, buildings_count: 0, rooms_count: 0, capacity: 0, books_count: 0, lng: 0, lat: 0 }"
      @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }" class="space-y-4 my-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        <div class="relative">
          <Field name="name" type="text" id="name" class="peer text-input" v-model="ecName"
            :disabled="educationCentersStore.isLoading" :placeholder="$t('name') + '*'"
            :class="{ 'is-invalid': errors.name }" />
          <p class="error-message" v-if="!!errors.name">{{ $t(errors.name, { fieldName: $t('name') }) }}</p>
          <label for="name" class="text-input-placeholder">
            {{ $t('name') + '*' }}
          </label>
        </div>
        <div class="relative">
          <Field name="phone_number" type="text" id="phoneNumber" class="peer text-input" v-model="ecPhoneNumber"
            :disabled="educationCentersStore.isLoading" :placeholder="$t('phoneNumber') + '*'"
            :class="{ 'is-invalid': errors.phone_number }" />
          <p class="error-message" v-if="!!errors.phone_number">{{ $t(errors.phone_number, {
            fieldName:
              $t('phoneNumber')
          }) }}</p>
          <label for="phoneNumber" class="text-input-placeholder">
            {{ $t('phoneNumber') + '*' }}
          </label>
        </div>
        <div class="relative col-span-1 md:col-span-2">
          <Field name="address" type="text" as="textarea" id="address" class="peer text-input" v-model="ecAddress"
            :disabled="educationCentersStore.isLoading" :placeholder="$t('address') + '*'"
            :class="{ 'is-invalid': errors.address }" rows="1" />
          <p class="error-message" v-if="!!errors.address">{{ $t(errors.address, {
            fieldName:
              $t('address')
          }) }}</p>
          <label for="address" class="text-input-placeholder">
            {{ $t('address') + '*' }}
          </label>
        </div>
        <div class="relative">
          <Field name="region" as="select" id="region" class="peer text-input" v-model="selectedRegion"
            :disabled="educationCentersStore.isLoading" :placeholder="$t('region') + '*'"
            :class="{ 'is-invalid': errors.region }">
            <option class="option" :value="0">{{ $t('unselected') }}</option>
            <option class="option" v-for="region in regions" :value="region.id">{{
              region.name }}
            </option>
          </Field>
          <p class="error-message" v-if="!!errors.region">{{ $t(errors.region, { fieldName: $t('region') }) }}</p>
          <label for="region" class="text-input-placeholder">
            {{ $t('region') + '*' }}
          </label>
        </div>
        <div class="relative">
          <Field name="country" as="select" id="country" class="peer text-input" v-model="selectedCountry"
            :disabled="educationCentersStore.isLoading" :placeholder="$t('country') + '*'"
            :class="{ 'is-invalid': errors.country }">
            <option class="option" :value="0">{{ $t('unselected') }}</option>
            <option class="option" v-for="country in countries" :value="country.id">{{
              country.name }}
            </option>
          </Field>
          <p class="error-message" v-if="!!errors.country">{{ $t(errors.country, { fieldName: $t('country') }) }}</p>
          <label for="country" class="text-input-placeholder">
            {{ $t('country') + '*' }}
          </label>
        </div>
        <div class="relative">
          <Field name="buildings_count" type="number" id="buildingsCount" class="peer text-input"
            :disabled="educationCentersStore.isLoading" v-model="ecBuildingsCount" :placeholder="$t('buildingsCount')"
            :class="{ 'is-invalid': errors.buildings_count }" />
          <p class="error-message" v-if="!!errors.buildings_count">{{ $t(errors.buildings_count, {
            fieldName:
              $t('buildingsCount')
          }) }}</p>
          <label for="buildingsCount" class="text-input-placeholder">
            {{ $t('buildingsCount') }}
          </label>
        </div>
        <div class="relative">
          <Field name="rooms_count" type="number" id="roomsCount" class="peer text-input" v-model="ecRoomsCount"
            :disabled="educationCentersStore.isLoading" :placeholder="$t('roomsCount')"
            :class="{ 'is-invalid': errors.rooms_count }" />
          <p class="error-message" v-if="!!errors.rooms_count">{{ $t(errors.rooms_count, {
            fieldName:
              $t('roomsCount')
          }) }}</p>
          <label for="roomsCount" class="text-input-placeholder">
            {{ $t('roomsCount') }}
          </label>
        </div>
        <div class="relative">
          <Field name="capacity" type="number" id="capacity" class="peer text-input" :placeholder="$t('capacityP')"
            :disabled="educationCentersStore.isLoading" v-model="ecCapacity"
            :class="{ 'is-invalid': errors.capacity }" />
          <p class="error-message" v-if="!!errors.capacity">{{ $t(errors.capacity, {
            fieldName:
              $t('capacityP')
          }) }}</p>
          <label for="capacity" class="text-input-placeholder">
            {{ $t('capacityP') }}
          </label>
        </div>
        <div class="relative">
          <Field name="books_count" type="number" id="booksCount" class="peer text-input" v-model="ecBooksCount"
            :disabled="educationCentersStore.isLoading" :placeholder="$t('booksCount')"
            :class="{ 'is-invalid': errors.books_count }" />
          <p class="error-message" v-if="!!errors.books_count">{{ $t(errors.books_count, {
            fieldName:
              $t('booksCount')
          }) }}</p>
          <label for="booksCount" class="text-input-placeholder">
            {{ $t('booksCount') }}
          </label>
        </div>
        <div class="relative">
          <Field name="lng" type="number" id="lng" class="peer text-input" :placeholder="$t('lng')" v-model="ecLng"
            :disabled="educationCentersStore.isLoading" :class="{ 'is-invalid': errors.lng }" />
          <p class="error-message" v-if="!!errors.lng">{{ $t(errors.lng, {
            fieldName:
              $t('lng')
          }) }}</p>
          <label for="lng" class="text-input-placeholder">
            {{ $t('lng') }}
          </label>
        </div>
        <div class="relative">
          <Field name="lat" type="number" id="lat" class="peer text-input" :placeholder="$t('lat')" v-model="ecLat"
            :disabled="educationCentersStore.isLoading" :class="{ 'is-invalid': errors.lat }" />
          <p class="error-message" v-if="!!errors.lat">{{ $t(errors.lat, {
            fieldName:
              $t('lat')
          }) }}</p>
          <label for="lat" class="text-input-placeholder">
            {{ $t('lat') }}
          </label>
        </div>
      </div>
      <div class="mt-10 flex flex-wrap justify-center md:justify-end lg:justify-end">
        <button :disabled="isSubmitting || educationCentersStore.isLoading"
          class="flex w-50 justify-center btn-primary">
          <TheSpinner :class="{ hidden: !isSubmitting || !educationCentersStore.isLoading }" />
          <span :class="{ hidden: isSubmitting || educationCentersStore.isLoading }">{{ $t('edit') }}</span>
        </button>
      </div>
      <div v-if="errors.apiError" class="text-center text-red-500 mt-3 mb-0 text-sm select-none">{{
        errors.apiError
        }}
      </div>
    </Form>
  </div>
</template>
<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  appearance: textfield;
}
</style>
