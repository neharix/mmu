<script setup>
import { storeToRefs } from "pinia";
import TheBreadcrumb from "@/components/TheBreadcrumb.vue";
import { onMounted } from "vue";
import TheSpinner from "@/components/TheSpinner.vue";
import { useStudentsStore } from "@/stores/api.store";
import StudentsDataTable from "@/components/DataTables/StudentsDataTable.vue";



const studentsStore = useStudentsStore();

const { students, dataTablePageCount } = storeToRefs(studentsStore);

onMounted(() => {
  studentsStore.isLoading = true;
  studentsStore.getAll().then(() => {
    studentsStore.isLoading = false;
  })
})


function updateData() {
  studentsStore.isLoading = true;
  studentsStore.getAll().then(() => {
    studentsStore.isLoading = false;
  })
}

const breadcrumbPaths = [
  { name: "students", routeName: "students-list" },
  { name: "add", routeName: "add-student" },
]

</script>

<template>
  <div class="w-full">
    <the-breadcrumb :paths="breadcrumbPaths"></the-breadcrumb>
    <div v-if="studentsStore.isLoading"
      class="flex w-full h-[58vh] items-center justify-center dark:bg-[#112731] bg-white rounded-lg border border-gray-200 dark:border-0">
      <the-spinner class="w-24"></the-spinner>
    </div>
    <div v-else>
      <StudentsDataTable :data="students" @update="updateData" :total-pages="dataTablePageCount" />
    </div>
  </div>
</template>

<style scoped></style>
