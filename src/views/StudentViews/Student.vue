<script setup>
import { useStudentsStore } from '@/stores/api.store';
import { useUxStore } from '@/stores/ux.store';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import TheSpinner from '@/components/TheSpinner.vue';
import { baseUrl } from '@/api/base';

const uxStore = useUxStore()
const studentsStore = useStudentsStore();
const { student, studentCourses, studentCertificates } = storeToRefs(studentsStore);
const route = useRoute();

onMounted(async () => {
  await studentsStore.get(route.params.id);
  await studentsStore.getCourses(route.params.id);
  await studentsStore.getCertificates(route.params.id);
})

function viewCertificate(id) {
  let link = document.createElement("a");
  link.href = baseUrl + `/certificates/${id}/`;
  link.target = "_blank";
  link.className = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


</script>
<template>
  <div class="w-full rounded-lg shadow-lg p-4 bg-mbg dark:bg-mdbg">
    <div class="flex justify-between">
      <h3 class="text-base md:text-xl font-bold mx-2 select-none">{{ $t('infoAboutStudent') }}</h3>
      <the-spinner v-if="uxStore.isLoading"></the-spinner>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
      <div>
        <p class="info-label">{{ $t('fullName') }}</p>
        <p class="info-content">{{
          student.full_name }}
        </p>
      </div>
    </div>
  </div>
  <div class="w-full rounded-lg mt-6 shadow-lg p-4 bg-mbg dark:bg-mdbg">
    <!-- <h2 class="text-base md:text-xl font-bold mx-2 mb-6 select-none">{{ $t('studentCourses') }}</h2> -->
    <!-- <table class="table-fixed">
      <thead>
        <tr>
          <th class="p-2">{{ $t('id') }}</th>
          <th class="p-2">{{ $t('name') }}</th>
          <th class="p-2">{{ $t('educationCenter') }}</th>
          <th class="p-2">{{ $t('direction') }}</th>
          <th class="p-2">{{ $t('tools') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in studentCourses" :key="idx">
          <td class="p-2 text-center">{{ idx + 1 }}</td>
          <td class="p-2">{{ item.name }}</td>
          <td class="p-2">{{ item.education_center.name }}</td>
          <td class="p-2">{{ item.direction.name }}</td>
          <td class="p-2">
            <button class="btn-primary" @click="viewCertificate()">{{ $t('viewCertificate') }}</button>
          </td>
        </tr>
      </tbody>
    </table> -->
    <h2 class="text-base md:text-xl font-bold mx-2 mb-6 select-none">{{ $t('studentCertificates') }}</h2>
    <table class="table-fixed">
      <thead>
        <tr>
          <th class="p-2">{{ $t('id') }}</th>
          <th class="p-2">{{ $t('educationCenter') }}</th>
          <th class="p-2">{{ $t('courseName') }}</th>
          <th class="p-2">{{ $t('direction') }}</th>
          <th class="p-2">{{ $t('tools') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in studentCertificates" :key="idx">
          <td class="p-2 text-center">{{ idx + 1 }}</td>
          <td class="p-2">{{ item.education_center.name }}</td>
          <td class="p-2">{{ item.course.name }}</td>
          <td class="p-2">{{ item.course.direction.name }}</td>
          <td class="p-2">
            <button class="btn-primary" @click="viewCertificate(item.id)">{{ $t('viewCertificate') }}</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

</template>
<!---->
