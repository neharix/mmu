<script setup>
import { storeToRefs } from "pinia";
import TheBreadcrumb from "@/components/TheBreadcrumb.vue";
import { onMounted } from "vue";
import { useUxStore } from "@/stores/ux.store";
import TheSpinner from "@/components/TheSpinner.vue";
import { useEducationCentersStore } from "@/stores/api.store";
import EducationCentersDataTable from "@/components/DataTables/AchievementsDataTable.vue";

const uxStore = useUxStore();


const educationCentersStore = useEducationCentersStore();

const { educationCenters, dataTablePageCount } = storeToRefs(educationCentersStore);

onMounted(() => {
  educationCentersStore.isLoading = true;
  educationCentersStore.getAll().then(() => {
    educationCentersStore.isLoading = false;
  })
})


function updateData() {
  educationCentersStore.isLoading = true;
  educationCentersStore.getAll().then(() => {
    educationCentersStore.isLoading = false;
  })
}

const breadcrumbPaths = [
  { name: "educationCenters", routeName: "education-centers-list" },
  { name: "add", routeName: "add-education-center" },
]

</script>

<template>
  <div class="w-full">
    <the-breadcrumb :paths="breadcrumbPaths"></the-breadcrumb>
    <div v-if="educationCentersStore.isLoading"
      class="flex w-full h-[58vh] items-center justify-center dark:bg-[#112731] bg-white rounded-lg border border-gray-200 dark:border-0">
      <the-spinner class="w-24"></the-spinner>
    </div>
    <div v-else>
      <EducationCentersDataTable :data="educationCenters" @update="updateData" :total-pages="dataTablePageCount" />
    </div>
  </div>
</template>

<style scoped></style>
